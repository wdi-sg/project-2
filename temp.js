    if ( trade.dealSweetener ) {
      let sweetener = trade.dealSweetener;
      if ( secondId === currentId ) sweetener = -sweetener;
      if ( sweetener < 0 ) {
        sweetener = -sweetener;
        let sweetenerString =
          "Taking " + sweetener + " from " + trade.secondUser.name;
      } else if ( sweetener > 0 ) {
        let sweetenerString =
          "Giving " + sweetener + " to " + trade.secondUser.name;
      } else let sweetenerString = "No sweetening added";
    } else let sweetenerString = "No sweetening added";