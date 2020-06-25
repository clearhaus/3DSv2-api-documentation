/*
 * The point of the Scenario Selector is to make it possible to only view the
 * input fields that are required for a specific implementation scenario.  E.g.
 * Browser, Payment.  It should do the following
 * 1. When query/searchparams are empty, show all fields by default.
 * 2. When a scenario is selected, only show the relevant variables.
 * 3. Update the search params, so it is possible to link to the page.
 * 4. (TODO) Remember what you last viewed in localStorage, so it can be
 *    recalled if you're browsing around.
 */

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

  messageCategoryToValue(input) {
    switch(input) {
      case "P":
        return "01";
      case "NP":
        return "02";
      default:
        console.log("INVALID MESSAGE CATEGORY");
    }
  }

  deviceChannelToValue(input) {
    switch(input) {
      case "APP":
        return "01";
      case "BRW":
        return "02";
      case "3RI":
        return "03";
      default:
        console.log("INVALID DEVICE CHANNEL");
    }
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
    $('.argtable tbody tr').removeClass('irrelevant');

    if (deviceChannel != "") {
      var el = $('.argtable > tbody > tr:not([channels*="' + deviceChannel + '"])');

      el.each(function(_) {
        var tr = $(this);
        if (tr.attr('channels') != "") {
          tr.addClass('irrelevant');
        }
      });
    }

    if (messageCategory != "") {
      var el = $('.argtable tbody tr:not([categories*="' + messageCategory + '"])');

      el.each(function(_) {
        var tr = $(this);
        if (tr.attr('categories') != "") {
          tr.addClass('irrelevant');
        }
      });
    }

    // Hide inclusion requirement
    $('div.inclusion > div.dynamic:not([class*=hidden])').addClass('hidden');

    // Hide conditional descriptions.
    $('div.conditions > div:not([class*=hidden])').addClass('hidden');

    if (messageCategory == "") {
      var mcSelector = ":not([messageCategory])";
    } else {
      var mcSelector = '[messageCategory="'+ this.messageCategoryToValue(messageCategory) +'"]';
    }

    if (deviceChannel == "") {
      var dcSelector = ":not([deviceChannel])";
    } else {
      var dcSelector = '[deviceChannel="'+ this.deviceChannelToValue(deviceChannel) +'"]';
    }

    // Show selected inclusions
    var inclusionSelector = 'div.inclusion > div.dynamic' + dcSelector + mcSelector;
    $(inclusionSelector).removeClass('hidden');

    // Show selected conditions
    var conditonsSelector = 'div.conditions > div' + dcSelector + mcSelector;
    $(conditonsSelector).removeClass('hidden');
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

  if (categorySelector.length == 0 || channelSelector.length == 0) {
    return;
  }

  var selectObject = new ScenarioSelector(channelSelector, categorySelector);
});
