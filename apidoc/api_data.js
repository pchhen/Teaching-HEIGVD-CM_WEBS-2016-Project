define({ "api": [
  {
    "type": "post",
    "url": "/tags/",
    "title": "Create a tag",
    "name": "PostTag",
    "group": "Tag",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Unique name of the Tag.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Description of the Tag.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Name of the Tag</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Description of the Tag.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controllers/types.js",
    "groupTitle": "Tag"
  }
] });
