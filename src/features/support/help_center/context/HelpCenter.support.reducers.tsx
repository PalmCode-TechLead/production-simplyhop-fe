import {
  HelpCenterSupportActionEnum,
  HelpCenterSupportActions,
  HelpCenterSupportFilters,
} from "./HelpCenter.support.types";

// Filters
export const HelpCenterSupportFiltersReducers = (
  state: HelpCenterSupportFilters,
  action: HelpCenterSupportActions
) => {
  switch (action.type) {
    case HelpCenterSupportActionEnum.SetFiltersData:
      return action.payload;

    default:
      return state;
  }
};
