import {
  MyListTripActionEnum,
  MyListTripActions,
  MyListTripBook,
  MyListTripDeleteRideNotification,
  MyListTripFilters,
  MyListTripRide,
  MyListTripShareRideNotification,
  MyListTripSuccessDeleteRideNotification,
} from "./MyList.trip.types";

// Filters
export const MyListTripFiltersReducers = (
  state: MyListTripFilters,
  action: MyListTripActions
) => {
  switch (action.type) {
    case MyListTripActionEnum.SetFiltersData:
      return action.payload;

    default:
      return state;
  }
};

// Ride
export const MyListTripRideReducers = (
  state: MyListTripRide,
  action: MyListTripActions
) => {
  switch (action.type) {
    case MyListTripActionEnum.SetRideData:
      return action.payload;
    case MyListTripActionEnum.SetRideDataData: {
      return {
        ...state,
        data: action.payload,
      };
    }
    case MyListTripActionEnum.SetRideDataPaginationCurrent: {
      return {
        ...state,
        pagination: {
          ...state.pagination,
          current: action.payload,
        },
      };
    }
    case MyListTripActionEnum.SetRideDataPaginationLast: {
      return {
        ...state,
        pagination: {
          ...state.pagination,
          last: action.payload,
        },
      };
    }

    default:
      return state;
  }
};

// Book
export const MyListTripBookReducers = (
  state: MyListTripBook,
  action: MyListTripActions
) => {
  switch (action.type) {
    case MyListTripActionEnum.SetBookData:
      return action.payload;
    case MyListTripActionEnum.SetBookDataData: {
      return {
        ...state,
        data: action.payload,
      };
    }
    case MyListTripActionEnum.SetBookDataPaginationCurrent: {
      return {
        ...state,
        pagination: {
          ...state.pagination,
          current: action.payload,
        },
      };
    }
    case MyListTripActionEnum.SetBookDataPaginationLast: {
      return {
        ...state,
        pagination: {
          ...state.pagination,
          last: action.payload,
        },
      };
    }
    default:
      return state;
  }
};

// DeleteRideNotification
export const MyListTripDeleteRideNotificationReducers = (
  state: MyListTripDeleteRideNotification,
  action: MyListTripActions
) => {
  switch (action.type) {
    case MyListTripActionEnum.SetDeleteRideNotificationData:
      return action.payload;

    default:
      return state;
  }
};

// SuccessDeleteRideNotification
export const MyListTripSuccessDeleteRideNotificationReducers = (
  state: MyListTripSuccessDeleteRideNotification,
  action: MyListTripActions
) => {
  switch (action.type) {
    case MyListTripActionEnum.SetSuccessDeleteRideNotificationData:
      return action.payload;

    default:
      return state;
  }
};

// ShareRideNotification
export const MyListTripShareRideNotificationReducers = (
  state: MyListTripShareRideNotification,
  action: MyListTripActions
) => {
  switch (action.type) {
    case MyListTripActionEnum.SetShareRideNotificationData:
      return action.payload;

    default:
      return state;
  }
};
