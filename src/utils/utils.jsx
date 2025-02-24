export const getDocumentType = (documentType) => {
  try {
    console.log(documentType);
    switch (documentType) {
      // "text/plain"
      case "application/pdf":
        return "./pdf-antd.svg";
      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        return "./docx.svg";
      case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
        return "./XLS.jpg";
      case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
        return "./ppt.svg";
      case "text/html":
        return "./html.svg";
      case "text/plain":
        return "./txt.svg";
      default:
        return "./docx.svg";
    }
  } catch (error) {
    console.log(error);
  }
};
