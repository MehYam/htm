// Current workflow is to paste this right into the dev console with the Isaac wiki page open, and
// run it manually
//
// i.e. extractToJSON(getTable(0)).
//
function extractToJSON(table)
{
	var retval = {};

	var nRows = table.rows.length;
	for (var r = 1; r < 5; ++r)
	{
		var row = table.rows[r];
		var nCols = row.cells.length;

		var entry = {};

		var nameAnchor  = row.cells[0].childNodes[0];
		var name = nameAnchor.childNodes[0].textContent;
		entry.wikiPage = nameAnchor.href;

		var thumbnail = row.cells[1].childNodes[0].childNodes[0];
		entry.thumbnail = thumbnail.src;

		var description = row.cells[2];
		entry.descriptionHTML = description.innerHTML;
		retval[name] = entry;
	}
	return retval;
}

function getTable(index)
{
	return document.body.getElementsByTagName("table")[index];
}