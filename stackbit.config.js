import { defineStackbitConfig } from "@stackbit/types";
import { GitContentSource } from "@stackbit/cms-git";

export default defineStackbitConfig({
  stackbitVersion: "~0.6.0",
  contentSources: [
    new GitContentSource({
      rootPath: __dirname,
      contentDirs: ["content"],
      models: [
        {
          name: "Page",
          type: "page",
          filePath: "content/pages/{slug}.json",
          urlPath: "/{slug}",
          fields: [
            { name: "title", type: "string", required: false },
            { name: "heroHeading", type: "string", required: false },
            { name: "heroSubheading", type: "string", required: false }
          ]
        }
      ],
      assetsConfig: {
        referenceType: "static",
        staticDir: "public",
        uploadDir: "images",
        publicPath: "/"
      }
    })
  ]
});
