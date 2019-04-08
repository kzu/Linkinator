# Linkinator 2000

Provides short nice links for DevDiv's TFS:

![Screenshot](https://raw.githubusercontent.com/kzu/Linkinator/master/img/screenshot.png)

Just click the button to copy a nice short URL instead of the loooong one for the page you're currently viewing.

Examples of supported URLs:


| Nice URL | Original URL |
| ------------ |-------------|
| http://work.devdiv.io/WORK_ITEM_ID | https://devdiv.visualstudio.com/DevDiv/_workitems/edit/[WORK_ITEM_ID] |
| http://wiki.devdiv.io/Some/Subfolder/Page | https://devdiv.visualstudio.com/DevDiv/_wiki/wikis/DevDiv.wiki?pagePath=%2FSome%2FSubfolder%2FPage |
| http://build.devdiv.io/BUILD_ID | https://devdiv.visualstudio.com/DevDiv/_build/index?buildId=[BUILD_ID] |
| http://build.devdiv.io/DEFINITION_ID | https://devdiv.visualstudio.com/DevDiv/_build/index?definitionId=[DEFINITION_ID]&_a=completed |
| http://build.devdiv.io/DEFINITION_ID | https://devdiv.visualstudio.com/DevDiv/DevDiv%20Team/_build?definitionId=[DEFINITION_ID]&_a=summary
| http://release.devdiv.io/DEFINITION_ID | https://devdiv.visualstudio.com/DevDiv/_release?definitionId=[DEFINITION_ID]&_a=releases |
| http://release.devdiv.io/DEFINITION_ID | https://devdiv.visualstudio.com/DevDiv/_releaseDefinition?definitionId=[DEFINITION_ID]&_a=environments-editor-preview |
| http://release.devdiv.io/RELEASE_ID | https://devdiv.visualstudio.com/DevDiv/_release?releaseId=[RELEASE_ID]&_a=release-summary |
| http://release.devdiv.io/RELEASE_ID | https://devdiv.visualstudio.com/DevDiv/_releaseProgress?releaseId=[RELEASE_ID]&_a=release-pipeline-progress |
| http://release.devdiv.io/DEFINITION_ID | https://devdiv.visualstudio.com/DevDiv/_apps/hub/ms.vss-releaseManagement-web.hub-explorer?definitionId=[DEFINITION_ID]&_a=releases |
| http://release.devdiv.io/RELEASE_ID | https://devdiv.visualstudio.com/DevDiv/_apps/hub/ms.vss-releaseManagement-web.hub-explorer?definitionId=[DEFINITION_ID]&_a=release-summary&releaseId=[RELEASE_ID]&source=ReleaseExplorer |
| http://feedback.devdiv.io/[ID] | https://developercommunity.visualstudio.com/content/problem/[ID]/[LOOONG-TITLE-WITH-DASHES].html |

Install from the [Chrome WebStore](https://goo.gl/u5ADhC)

[![Chrome WebStore](https://raw.githubusercontent.com/kzu/Linkinator/master/img/webstore.png)](https://goo.gl/u5ADhC)

The service runs in server-less azure functions that just map back to the original URL via a temporary redirect (307).