
## Object Identifier

```
	/* An object identifier.
		
		Select an object by either:
			One, and only one, of the numerical id or name of the workspace,
			where the name can also be a KBase ID including the numerical id,
			e.g. kb|ws.35.
				ws_id wsid - the numerical ID of the workspace.
				ws_name workspace - name of the workspace or the workspace ID
					in KBase format, e.g. kb|ws.78.
			AND 
			One, and only one, of the numerical id or name of the object.
				obj_id objid- the numerical ID of the object.
				obj_name name - name of the object.
			OPTIONALLY
				obj_ver ver - the version of the object.
		OR an object reference string:
			obj_ref ref - an object reference string.
	*/
	typedef structure {
		ws_name workspace;
		ws_id wsid;
		obj_name name;
		obj_id objid;
		obj_ver ver;
		obj_ref ref;
	} ObjectIdentity;
```

## Object Ref


```
/* A string that uniquely identifies an object in the workspace service.
	
		There are two ways to uniquely identify an object in one string:
		"[ws_name or id]/[obj_name or id]/[obj_ver]" - for example,
			"MyFirstWorkspace/MyFirstObject/3" would identify the third version
			of an object called MyFirstObject in the workspace called
			MyFirstWorkspace. 42/Panic/1 would identify the first version of
			the object name Panic in workspace with id 42. Towel/1/6 would
			identify the 6th version of the object with id 1 in the Towel
			workspace. 
		"kb|ws.[ws_id].obj.[obj_id].ver.[obj_ver]" - for example, 
			"kb|ws.23.obj.567.ver.2" would identify the second version of an
			object with id 567 in a workspace with id 23.
		In all cases, if the version number is omitted, the latest version of
		the object is assumed.
	*/
	typedef string obj_ref;
```

So our javscript object identifier is close to this, but is idiomatic javascript

it can take the following forms:

```
{
    workspace: {
        id: <integer>,
        name: <string2>
    },
    object: {
        id: <integer>
        name: <string2>
    },
    version: <integer>
}
```

or

```
{
    ref: <string>
}
```

For example

```json
var myObject = {
    workspace: {
        id: 123
    },
    object: {
        name: "My_object"
    },
    version: 12
}
```

or

```json
var myObject = {ref: "123/My_object/12"}

```

```
{
    workspace: <integer> | <string>,
    id: <integer> | <string>,
    version: <integer>
}
```

Although generally the full object form may be used, it is much preferrable to 
first canonicalize the reference using the makeObjectReference method

var myObect = util.makeObjectReference(workspaceIdOrName, objectIdOrName, version)

