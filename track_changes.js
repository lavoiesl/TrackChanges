var TrackChanges = {
  selector: '.track-change',
  changed_class: 'changed',
  original: 'original',
  elements_selector: 'input[name], textarea[name], select[name]',

  check: function(obj) {
    var original = TrackChanges.get_original(obj);
    if (!original) return;

    if (TrackChanges.get(obj) == original) {
      $(obj).removeClass(TrackChanges.changed_class);
    } else {
      $(obj).addClass(TrackChanges.changed_class);
    }
  },

  unsaved_warning: function() {
    var changed = TrackChanges.changed_items();
    if (changed.length) {
      return "You currently have " + changed.length + ' unsaved items,\n do you wish to proceed?';
    } else {
      return null;
    }
  },

  unsaved_confirm: function() {
    var warning = TrackChanges.unsaved_warning();
    if (warning) {
      return confirm(warning);
    } else {
      return true;
    }
  },

  checkAll: function() {
    $(TrackChanges.selector).each(function(){
      TrackChanges.check(this);
    });
  },

  register: function() {
    $(TrackChanges.selector).each(function(){
      TrackChanges.set_original(this);
      var obj = this;
      $(this).delegate(
        TrackChanges.elements_selector,
        'click blur change',
        function(){TrackChanges.check(obj);}
      );
    });
  },

  changed_items: function() {
    return $(TrackChanges.selector + '.' + TrackChanges.changed_class);
  },

  set_original: function(obj) {
    $(obj).data(TrackChanges.original, TrackChanges.get(obj));
  },

  get_original: function(obj)  {
    return $(obj).data(TrackChanges.original);
  },


  elements: function(obj) {
    return $(TrackChanges.elements_selector,obj);
  },

  get: function (obj) {
    var checksum = [];
    var elements = TrackChanges.elements(obj);
    for (var i = 0; i < elements.length; i++) {
      var val = $(elements[i]).val();
      if (val) {
        checksum.push(val);
      }
    }
    return checksum.join('|');
  }
};

$(TrackChanges.register);