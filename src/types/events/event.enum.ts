export enum EventsEnumType {
  createUser = "create_user",
  getProfile = "get_user_profile",
  deleteUser = "delete_user",
  loginUser = "login_user",
  logoutUser = "logout_user",
  createEvent = "create_event",
  saveLogs = "save_logs",
  topEvents = "top_events",
  analyticsUser = "analytics_user",
  recentEvents = "recent_events",
  getEvent = "get_event",
  refreshToken = "refresh-token",
}

export enum ResultMetadataKafka {
  success = "success",
  failure = "failure",
}
export enum ResourceTypeMetadataKafka {
  auth = "auth",
  events = "events",
  user = "user",
  analytics = "analytics",
}
export enum EnvMetadataKafka {
  dev = "dev",
  stage = "stage",
  prod = "prod",
}