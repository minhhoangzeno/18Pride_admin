export const tinyConfig = {
  height: 400,
  menu: {
      file: { title: 'File', items: 'newdocument | preview | print ' },
      edit: { title: 'Edit', items: 'undo redo | cut copy paste | selectall | searchreplace' },
      view: { title: 'View', items: 'code | visualaid visualchars visualblocks | spellchecker | preview fullscreen' },
      insert: { title: 'Insert', items: 'image link media template codesample inserttable | charmap emoticons hr | pagebreak nonbreaking anchor toc | insertdatetime' },
      format: { title: 'Format', items: 'bold italic underline strikethrough superscript subscript codeformat | formats blockformats fontformats fontsizes align lineheight | forecolor backcolor | removeformat' },
      tools: { title: 'Tools', items: 'spellchecker  | code wordcount' },
      table: { title: 'Table', items: 'inserttable | cell row column | tableprops' }
  },
  plugins: 'imagetools preview print spellchecker paste searchreplace code visualchars visualblocks preview importcss searchreplace directionality code wordcount visualblocks visualchars charmap hr pagebreak nonbreaking anchor toc advlist lists textpattern noneditable image link media template codesample  charmap emoticons hr pagebreak nonbreaking anchor toc insertdatetime',
  toolbar: 'undo redo | fontselect fontsizeselect formatselect | bold italic bullist forecolor | image link media emoticons | fullscreen  preview ',
  placeholder: "Nhập nội dung của bạn vào đây...",
  statusbar: true,
  toolbar_location: "top",
  // images_upload_handler: image_upload_handler,
  // file_picker_callback: filePickerCallback,
  image_caption: true,
}
