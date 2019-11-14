class ScenarioSelector {
  constructor(channelSelector, categorySelector) {
    this.channelSelector = channelSelector[0];
    this.categorySelector = categorySelector[0];

    this.setScenarioFromURL();
    this.scenarioSelectListener(this);

    // Start listening to input selectors.
    var self = this;
    categorySelector.change(function() {
      self.scenarioSelectListener(self);
    });

    channelSelector.change(function() {
      self.scenarioSelectListener(self);
    });
  }

  setScenarioInURL(deviceChannel, messageCategory) {
    var currentURL = window.location.href;
    var parsedURL = new URL(currentURL);

    if (deviceChannel == this.defaultDeviceChannel() || deviceChannel == "") {
      parsedURL.searchParams.delete('deviceChannel');
    } else {
      parsedURL.searchParams.set('deviceChannel', deviceChannel);
    }

    if (messageCategory == this.defaultMessageCategory() || messageCategory == "") {
      parsedURL.searchParams.delete('messageCategory');
    } else {
      parsedURL.searchParams.set('messageCategory', messageCategory);
    }

    window.history.replaceState({}, "", parsedURL.href);
  }

  scenarioSelectListener(self) {
    var deviceChannel = self.channelSelector.value;
    var messageCategory = self.categorySelector.value;

    self.setScenarioInURL(deviceChannel, messageCategory);
    self.filterOnScenario(deviceChannel, messageCategory);
  }

  filterOnScenario(deviceChannel, messageCategory) {
    $('.argtable tbody tr').show()

    if (deviceChannel != "") {
      $('.argtable tbody tr:not([channels*="' + deviceChannel + '"])').hide();
    }

    if (messageCategory != "") {
      $('.argtable tbody tr:not([categories*="' + messageCategory + '"])').hide();
    }
  }

  setScenarioFromURL() {
    var currentURL = window.location.href;
    var parsedURL = new URL(currentURL);

    var dc = parsedURL.searchParams.get('deviceChannel')
    var mc = parsedURL.searchParams.get('messageCategory')

    if (dc != null && dc != "") {
      this.channelSelector.value = dc;
      //dc = this.defaultDeviceChannel()
    }

    if (mc != null && mc != "") {
      this.categorySelector.value = mc;
    }
  }

  defaultDeviceChannel() {
    this.channelSelector.options[0].value
  }

  defaultMessageCategory() {
    this.categorySelector.options[0].value
  }
}

$(document).ready(function() {
  var categorySelector = $('select.messageCategory');
  var channelSelector = $('select.deviceChannel');

  var selectObject = new ScenarioSelector(channelSelector, categorySelector);
});
