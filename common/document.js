import request from 'common/request'


const getMarkdownFileContent = async function(documentUrl) {
	let data = await request.get(documentUrl);
	return data;
}

export default {
	getMarkdownFileContent,
}
