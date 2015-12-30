// Current workflow:
//
// 1) open the isaac rebirth wiki page to scrape
// 2) paste this file directly in the dev console
// 3) run scrapeTable() and scrapeTableSublementalTemplate, save them directly to files
// 3.5) there may be more than one table of items to scrape per page, so pass in different table indices as appropriate
// 4) save the files where the combiner script can find them

var g_scrapeDescriptionColumn = 2; // == 3 for cards and runes
function scrapeTable(tableIndex)
{
	return JSON.stringify(extractToJSON(getTable(tableIndex), rowImageAndThumbnailScrape), null, '\t');
}
function scrapeTableSublementalTemplate(tableIndex)
{
	return JSON.stringify(extractToJSON(getTable(tableIndex), rowMetadataTemplateScrape), null, '\t');
}
function extractToJSON(table, rowScraper)
{
	var retval = {};

	var nRows = table.rows.length;
	for (var r = 1; r < nRows; ++r)
	{
		var row = table.rows[r];
		var nCols = row.cells.length;

		var entry = {};

		var nameAnchor  = row.cells[0].childNodes[0];
		var name = nameAnchor.childNodes[0].textContent;

		rowScraper(row, entry);

		retval[name] = entry;
	}
	return retval;
}
function rowImageAndThumbnailScrape(row, entry)
{
	entry.wikiPage = row.cells[0].childNodes[0].href;

	var thumbnail = row.cells[1].childNodes[0].childNodes[0];
	entry.thumbnail = thumbnail.src;

	var description = row.cells[g_scrapeDescriptionColumn];
	entry.descriptionHTML = description.innerHTML;
}
function rowMetadataTemplateScrape(row, entry)
{
	entry.itemClass = "";
	entry.itemType = "";
	entry.itemColor = "";
	entry.itemTags = "";
}
function getTable(index)
{
	return document.body.getElementsByTagName("table")[index];
}