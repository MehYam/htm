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
		["battery", "charge"],
		["syringe", "needle"],
		["gray", "grey"],
		["tear", "teardrop"],
		["fly", "flies"],
		["zodiac", "horoscope", "horroscope"],
		["round", "circle", "ball", "sphere"]
	]
};

function prepareData(data)
{
	//KAI: maybe include a "class" field.  When scoring matches, the name is weighted higher than class, then higher then tags
	// add a by-name lookup
	data.itemLookup = {};

	// convert item.tags to a hash for faster lookups (KAI: is it really faster than just indexOf on .tags?)
	data.items.forEach(function(item, i, array)
	{
		item.nameLowerCase = item.name.toLowerCase();
		data.itemLookup[item.nameLowerCase] = item;

		var tags = item.tags.split(' ');

		item.tagLookup = {};
		tags.forEach(function(tag, i, array)
		{
			item.tagLookup[tag] = 1;
		});
	});

	// turn alias list into a hash
	data.aliasLookup = {};
	data.aliases.forEach(function(aliases, i, array)
	{
		aliases.forEach(function(alias, i, array)
		{
			if (data.aliasLookup[alias])
			{
				console.error("alias " + alias + " already in use");
			}
			else
			{
				data.aliasLookup[alias] = aliases;
			}
		});
	});
}

prepareData(g_testData);

function retrieveHits(data, searchText)
{
	// split search into multiple terms
	var terms = searchText.toLowerCase().split(' ');  // KAI: should maybe regexp for whitespace instead

	// for each term, find any aliases and add them to the list of tags
	var aliases = [];
	terms.forEach(function(term, i, array)
	{
		var alias = data.aliasLookup[term];
		if (alias && alias != term)
		{
			aliases.push(alias);
		}
	});

	terms = terms.concat(aliases);

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

//KAI: searching rules:
// 1) maybe handle plurals
// 2) audit/normalize item.tags so that aliases don't appear? maybe not  
function update()
{
	var terms = event.currentTarget.value;
	if (terms.length > 0)
	{
		var hits = retrieveHits(g_testData, event.currentTarget.value);
		console.log("hits " + hits.length);
	}
}