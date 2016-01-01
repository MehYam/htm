// TO DO:
// 1. data merge
// 2. hook up searching
// 3. results rendering
// 4. hand-tune supplemental data
//
// ALSO
// - add pills

var g_testData =
{
	"items":
	[
		{ "name": "9 volt", "tags": "battery cube duracell"},
		{ "name": "Abaddon", "tags": "penta star red"},
		{ "name": "Abel", "tags": "familiar face dead baby gray"},
		{ "name": "Anemic", "tags": "tear red"},
		{ "name": "Aquarius", "tags": "zodiac blue waves"},
		{ "name": "Aries", "tags": "zodiac blue ram"},
		{ "name": "Ball Of Bandages", "tags": "familiar orbital round pink"}
	],
	"aliases":
	[
		"battery charge",
		"syringe needle",
		"black dark gray grey",
		"fly flies",
		"zodiac horoscope horroscope",
		"round circle ball sphere"
	]
};

function prepareTestData(data)
{
	// process the aliases first
	var aliasLookup = {};
	data.aliases.forEach(function(aliasString, i, array)
	{
		var aliases = aliasString.split(' ');
		aliases.forEach(function(alias, i, array)
		{
			aliasLookup[alias] = aliasString;
		});
	});


	//KAI: maybe include a "class" field.  When scoring matches, the name is weighted higher than class, then higher then tags
	// add a by-name lookup
	data.itemLookup = {};

	// convert item.tags to a hash for faster lookups (KAI: is it really faster than just indexOf on .tags?)
	data.items.forEach(function(item, i, array)
	{
		item.nameLowerCase = item.name.toLowerCase();
		data.itemLookup[item.nameLowerCase] = item;

		var aliasesToAppend = "";
		var tags = item.tags.split(' ');
		tags.forEach(function(tag, i, array)
		{
			if (aliasLookup[tag])
			{
				aliasesToAppend += " " + aliasLookup[tag];
			}
		});
		item.tags += " " + aliasesToAppend;
	});
}

function retrieveTestHits(data, searchText)
{
	// split search into multiple terms
	var terms = searchText.toLowerCase().split(' ');  // KAI: should maybe regexp for whitespace instead

	// scan the items, gather the hits
	var hits = [];
	var nTerms = terms.length;
	data.items.forEach(function(item, i, array)
	{
		for (var i = 0; i < nTerms; ++i)
		{
			var term = terms[i];
			if (item.nameLowerCase.indexOf(term) >= 0 || item.tags.indexOf(term) >= 0)
			{
				hits.push(item);
				break;
			}
		}
	});

	return hits;
}

var g_data = 
{
	items: {}
};
var g_classes = "collectible passive trinket card rune pill"
function prepareData(data)
{
	mergeItems(data, [afterbirthCollectibles, afterbirthCollectiblesSupplemental], function(item) {  item.itemClass = "collectible"; });
	mergeItems(data, [rebirthCollectibles, rebirthCollectiblesSupplemental], function(item) {  item.itemClass = "collectible"; });
	mergeItems(data, [afterbirthTrinkets, afterbirthTrinketsSupplemental], function(item) {  item.itemClass = "trinket"; });
	mergeItems(data, [rebirthTrinkets, rebirthTrinketsSupplemental], function(item) {  item.itemClass = "trinket"; });
	mergeItems(data, 
		[cards, cardsSupplemental, cardsOther, cardsOtherSupplemental, cardsPlaying, cardsPlayingSupplemental, cardsSpecial, cardsSpecialSupplemental], 
		function(item) { item.itemClass = "card"; });
	mergeItems(data, [runes1, runes2, runes1Supplemental, runes2Supplemental], function(item) { item.itemClass = "rune"; })
}
function mergeItems(data, itemTableArray, override)
{
	itemTableArray.forEach(function(itemTable)
	{
		for (var key in itemTable)
		{
			var source = itemTable[key];
			var keyLower = key.toLowerCase().trim();  // some whitespace snuck into names during scraping, thought I trimmed everything
			var merged = data.items[keyLower] || {};

			merged.properName = key;
			merged.wikiPage = merged.wikiPage || source.wikiPage;
			merged.thumbnail = merged.thumbnail || source.thumbnail;
			merged.descriptionHTML = merged.descriptionHTML || source.descriptionHTML;
			merged.itemClass = merged.itemClass || source.itemClass;
			merged.itemType = merged.itemType || source.itemType;
			merged.itemColor = merged.itemColor || source.itemColor;
			merged.itemTags = merged.itemTags || source.itemTags;

			if (override)
			{
				override(merged);
			}
			data.items[keyLower] = merged;
		}
	});
}

update.lastTerms = null;
function update()
{
	var terms = event.currentTarget.value.trim();
	console.log("terms '" + terms + "'");

	if (update.lastTerms != terms && terms.length > 0)
	{
		var hits = retrieveTestHits(g_testData, terms);
		update.lastTerms = terms;

		console.log("hits " + hits.length);
	}
}

prepareTestData(g_testData);
prepareData(g_data);
loading.style.visibility = "hidden";