var carousel = {
  active: null,
  is_selected: null,
  $navButton: null,
  $navButtonActive: null,
  $row: null,
  $rowSelected: null,
  $rowRadioBtnWrap: null,
  $imageItem: null,
  $imageItemActive: null,
  $rowRadioBtn: null,
  $radioBtnActive: null,
  $img: null,
  $imgActive: null,
  $radioBtn: null,
  $rowRadioBtnActive: null,
  controls: {},
  items: null,

  init: function () {
    this.setParams().removeEvent().setEvent();
  },

  setParams: function() {
    // items state
    this.active = 'active';
    this.is_selected = 'selected';
    // navButton
    this.$navButton = $('.nav_button');
    this.$navButtonActive = $('.nav_button.active');
    // some helping var
    this.$rowRadioBtnWrap = $('.slider_row_items_wrap2');
    this.$imageItem = $('.slider_row_block_image');
    this.$imageItemActive = $('.slider_row_block_image.active');
    // row (Pages)
    this.$row = $('.slider_row_block');
    this.$rowSelected = $('.slider_row_block.selected');
    // row (Pages) nav indication
    this.$rowRadioBtn = this.$rowRadioBtnWrap.find(this.$navButton);
    this.$rowRadioBtnActive = this.$rowRadioBtnWrap.find(this.$navButtonActive);
    // img
    this.$img = this.$rowSelected.find(this.$imageItem);
    this.$imgActive = this.$rowSelected.find(this.$imageItemActive);
    // img nav indication
    this.$radioBtn = this.$rowSelected.find(this.$navButton);
    this.$radioBtnActive = this.$rowSelected.find(this.$navButtonActive);

    this.controls = {
      38: 'up',
      40: 'down',
      37: 'left',
      39: 'right',
    };

    return this;
  },

  setEvent: function () {
    var _this = this;

    $(document).on('keyup', function (e) {
      _this.setParams();
      if (undefined !== _this.controls[e.which]) {
        e.preventDefault();
        _this.controlsAction[_this.controls[e.which]](_this);
      }
    });

    _this.clickEvent();
  },

  removeEvent: function () {
    $(document).off('keyup');
    return this;
  },

  removeClassControlsY: function() {
    var _this = this;

    _this.$rowRadioBtn.removeClass(_this.active);
    _this.$row.removeClass(_this.is_selected);
  },

  removeClassControlsX: function() {
    var _this = this;

    _this.$radioBtn.removeClass(_this.active);
    _this.$img.removeClass(_this.active);
  },

  clickEvent: function() {
    var _this = this;

    _this.$navButton.on('click', function (action) {
      action.preventDefault();
      _this.setParams();

      var $getIndex = $(action.target).index(),
          $target = $(action.target);

      if ($target.hasClass("slider_row_block_item")) {
        _this.removeClassControlsX();
        $target.addClass('active');
        $(_this.$img[$getIndex]).addClass(_this.active);
      }
      else if ($target.hasClass("slider_row_item")) {
        _this.removeClassControlsY();
        $target.addClass('active');
        $(_this.$row[$getIndex]).addClass(_this.is_selected);
      }
    });
  },

  controlsAction: {

    up: function(_this) {
      if (_this.$rowSelected) {
        if (_this.$row.first().hasClass(_this.is_selected)) {
          _this.removeClassControlsY();
          _this.$rowRadioBtn.last().addClass(_this.active);
          _this.$rowSelected = _this.$row.last().addClass(_this.is_selected);
        }
        else if (_this.$rowSelected.prev().length) {
          _this.removeClassControlsY();
          _this.$rowRadioBtnActive.prev().addClass(_this.active);
          _this.$rowSelected = _this.$rowSelected.prev().addClass(_this.is_selected);
        }
      }
    },

    down: function(_this) {
      if (_this.$rowSelected) {
        if (_this.$row.last().hasClass(_this.is_selected)) {
          _this.removeClassControlsY();
          _this.$rowRadioBtn.first().addClass(_this.active);
          _this.$rowSelected = _this.$row.first().addClass(_this.is_selected);
        }
        else if (_this.$rowSelected.next().length) {
          _this.removeClassControlsY();
          _this.$rowRadioBtnActive.next().addClass(_this.active);
          _this.$rowSelected = _this.$rowSelected.next().addClass(_this.is_selected);
        }
      }
    },

    left: function(_this) {
      if (_this.$imgActive) {
        if (_this.$img.first().hasClass(_this.active)) {
          _this.removeClassControlsX();
          _this.$radioBtn.last().addClass(_this.active);
          _this.$imgActive = _this.$img.last().addClass(_this.active);
        }
        else if (_this.$imgActive.prev().length) {
          _this.removeClassControlsX();
          _this.$radioBtnActive.prev().addClass(_this.active);
          _this.$imgActive = _this.$imgActive.prev().addClass(_this.active);
        }
      }
    },

    right: function(_this) {
      if (_this.$imgActive) {
        if (_this.$img.last().hasClass(_this.active)) {
          _this.removeClassControlsX();
          _this.$radioBtn.first().addClass(_this.active);
          _this.$imgActive = _this.$img.first().addClass(_this.active);
        }
        else if (_this.$imgActive.next().length) {
          _this.removeClassControlsX();
          _this.$radioBtnActive.next().addClass(_this.active);
          _this.$imgActive = _this.$imgActive.next().addClass(_this.active);
        }
      }
    }
  },

  pagesVar: function() {
    var items,
        $imageArr = $('#imageArray'),
        $imageArr2 = $('#imageArray2'),
        $templateTarget = $('#target'),
        $templateTarget2 = $('#target2'),
        template = $imageArr.html(),
        template2 = $imageArr2.html();

    $templateTarget.html(_.template(template,{items:items}));
    $('#slider_row_block1').addClass('selected');
    $templateTarget2.html(_.template(template2,{items:items}));
    $('#slider_row_item1').addClass('active');

    return this;
  },

  getPage: function(id) {
    id -= 1;
    if (id >= 0) {
      return $(this.$row).eq(id);
    }
    else {
      console.error('not valid, enter number > 0');
    }
  },

  getPages: function() {
    return $(this.$row);
  },

  addPage: function() {
    var arrCloneItems = _.map(items, _.clone);
    items.push(arrCloneItems[1]);

    carousel.pagesVar().init();
  },

  insertPage: function(id) {
    id -= 1;

    if (id >= 0) {
      var arrCloneItems = _.map(items, _.clone);
      items.push(arrCloneItems[id]);
      carousel.pagesVar().init();
    }
    else {
      console.error('not valid, enter number > 0');
    }
  },

  removePage: function(id) {
    id -= 1;

    if (id >= 0) {
      if (id < this.$row.length) {
        items.splice(id, 1);
        carousel.pagesVar().init();
        console.log(this.$row.length);
      }
      else {
        console.error("This page doesn't exist");
      }
    }
  }
};

$(function() {
  carousel.pagesVar().init();
});