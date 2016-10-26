CKEDITOR.plugins.add('qwikilivelink', {
  lang: 'de,en,fr',
  icons: 'QwikiLivelink',
  hidpi: !0,
  init: function(editor) {
    var web = foswiki.getPreference('WEB');
    var config = editor.config;
    var mappings = config.livelink_web_mappings;
    var baseUri = config.livelink_base_uri;

    var wysiwyg = 0;
    if (baseUri && /\$ID/.test(baseUri) && mappings && mappings[web]) {
      wysiwyg = 1;
    }

    if (window.console && console.error) {
      if (!baseUri) {
        console.log('[qwikilivelink]: Missing configuration value for key =livelink_base_uri=');
      }

      if (!mappings[web]) {
        console.log('[qwikilivelink]: Missing configuration value for web =' + web + '= in key =livelink_web_mappings=');
      }
    }

    var livelinkCommand = new CKEDITOR.command(editor, {
      modes: {wysiwyg: wysiwyg, source: 0},
      exec: function(editor) {
        var target = baseUri.replace(/\$ID/, mappings[web]);
        var wnd = window.open(target, '_blank');
        wnd.focus();
        return false;
      }
    });

    editor.addCommand( 'QwikiLivelink', livelinkCommand );
    editor.ui.addButton( 'QwikiLivelink', {
      label: editor.lang.qwikilivelink.btn_title,
      command: 'QwikiLivelink',
      toolbar: 'mode'
    });
  }
});
