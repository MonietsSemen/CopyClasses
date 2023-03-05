importPackage(java.text);
importPackage(java.awt.datatransfer);
importPackage(com.intellij.openapi.fileEditor.FileEditorManager);
importPackage(com.intellij.openapi.project);
importPackage(com.intellij.openapi.editor);
importPackage(com.intellij.openapi.ide.CopyPasteManager);
importPackage(java.awt.datatransfer.StringSelection);

const actionId = 'CopyClasses'
ide.registerAction(actionId, "CopyClasses", (e) => {
  const projectManager = ProjectManager.getInstance();
  const projects = projectManager.getOpenProjects();
  const fileEditorManager = FileEditorManager.getInstance(projects[0]);
  const copyPasteManager = com.intellij.openapi.ide.CopyPasteManager.getInstance();

  if (fileEditorManager != null) {
    const selectedEditor = fileEditorManager.getSelectedEditor();
    const getEditor = selectedEditor.getEditor();
    const selectedText = getEditor.getSelectionModel().getSelectedText();
    const regex = /class="([\w\s-]+)"/g;
    const matches = new Set();
    let match;

    if (matches) {
      while ((match = regex.exec(selectedText))) {
        const classNames = match[1].split(' ');

        classNames.forEach(className => matches.add(className));
      }

      const formattedClasses = Array.from(matches)
          .map((className) => `.${className} {}`)
          .join("\n");

      copyPasteManager.setContents(new StringSelection(formattedClasses));

      ide.notify('Classes have been copied: ', + formattedClasses);
    } else {
      ide.notify('Classes', 'No classes found in selected text')
    }
    if (selectedEditor != null) {
      // ide.notify('Classes', 'Test: ' + selectedEditor);
    } else {
      ide.notify('Classes', 'No active editor found');
    }
  } else {
    ide.notify('Classes', 'FileEditorManager not found');
  }
});

ide.addShortcut(actionId, "ctrl 1");
