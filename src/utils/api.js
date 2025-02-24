export const getApis = {
  GetAllUsers: "/user/",
  GetPrivateChatHistory: "/chat/getPrivateChatHistory",
  GetPublicChatHistory: "/chat/getPublicChatHistory",
  GetBookmarkChatHistory: "/chat/getBookmarkChatHistory",
  GetChatByID: "/chat/getChatHistory/",
  GetEntraIdUsers: "/user/getEntraIDUsers",
  GetUserProfilePhoto: "/user/getUserProfilePhoto",
  ConnectorList: "/connector/getAllConnectors",
  GetRecentDocuments: "/user/getRecentDocuments",
  GetUserGroupList: "/usergroup/",
  GetUserGroupListOnlyNames: "/usergroup/userGroupList",
  GetSettings: "/settings/",
  GetCollectionsWithTags: "/tagCollection/collectionsWithTags",
  GetAllCollections: "/tagCollection/",
  GetAllTags: "/tag/",
  GetAllTagTypes: "/tagType/",
};

export const postApis = {
  UserLogin: "/user/userLogin",
  UserTestLogin: "/user/userTestLogin",
  AddUser: "/user/createUser",
  CreateProject: "/project/createProject",
  DeleteProject: "/project/deleteProject",
  UpdateProject: "/project/editProject",
  UploadDocument: "/project/upload",
  // GetPromptResult: "https://promptxai.ve3global.com/query",
  GetPromptResult: "/chat/getPromptResult",
  DeleteChat: "/chat/deleteChatHistory/",
  toggleAutoDelete: "/chat/toggleAutoDelete/",
  GetChat: "/chat/serchChatFromHistory",
  SendInvite: "/user/sendInvite",
  GetDocumentResult: "/document/searchDocument",
  GetSignedDocument: "/document/getSignedDocument",
  CreateConnector: "/connector/createConnector",
  AddRecentDocuments: "/user/addRecentDocuments",
  InitiateBatchSync: "/connector/initiateBatchSync",
  getSyncStatus: "/connector/getSyncStatus",
  deleteConnector: "/connector/deleteConnector",
  addUserToUserGroup: "/usergroup/addUser",
  addNewUserGroup: "/usergroup/",
  removeUserFromGroup: "/usergroup/removeUser",
  makeGroupLeader: "/usergroup/makeGroupLeader",
  removeGroupLeader: "/usergroup/removeGroupLeader",
  submitFeedback: "/chat/submitFeedback",
  updateSettings: "/settings/updateSettings",
  formatResponse: "/chat/format",
  createCollection: "/tagCollection/createCollection",
  createTag: "/tag/createTag",
};

export const patchApis = {
  toggleBookmark: "/chat/toggleBookmark",
  toggleChatType: "/chat/toggleAccessType",
  toggleBlock: "/user/toggleblock",
  renameChatTitle: "/chat/renamechattitle",
  toggleRole: "/user/toggleadminaccess",
  renameGroup: "/usergroup/renameGroup",
  toggleConnectorType: "/connector/toggleAccessType",
};

export const putApis = {
  updateCollection: "/tagCollection/",
};
export const deleteApis = {
  deleteUserGroup: "/usergroup/",
  deleteTag: "/tag/",
};
