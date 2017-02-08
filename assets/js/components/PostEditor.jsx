import React from "react";

import TextField from "material-ui/TextField";

class PostEditor extends React.Component {
	constructor(props) {
		super(props);

	}


	render() {
		return (
			<div style={{padding: "8px 16px"}}>
				<TextField
					floatingLabelText="Écrire une réponse ..."
					multiLine={true}
					rows={2}
					rowsMax={4}
					fullWidth={true}
				/>
			</div>
		);
	}
}

export default PostEditor;
