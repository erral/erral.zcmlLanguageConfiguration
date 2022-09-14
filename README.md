# ZCML Language Configuration and Formatter for VSCode

ZCML is an XML extension used by Zope applications to configure themselves. Its used extensively in [Plone](https://plone.org).

But formatting ZCML is hard in VSCode, and I have never been satisfied by existing formatters. To solve that [Alessandro Pisa](https://github.com/ale-rt) created [zpretty](https://github.com/collective/zpretty/) a _very opinionated_ ZCML formatter.

This extension integrates zpretty into VSCode to format your ZCMLs.

The code of this addon is based on [VSCode Custom Local Formatters](https://github.com/jkillian/vscode-custom-local-formatters), I have also extracted the XML language definition and grammar from VSCode itself and use them to create the ZCML language in VSCode.

The extension provides to configuration settings (with sane defaults), to provide the absolute path of your zpretty executable and the options passed to it.

If you have any questions or want to provide some feedback, add a [GitHub Issue](https://github.com/erral/erral.zcml-language-configuration/issues)
