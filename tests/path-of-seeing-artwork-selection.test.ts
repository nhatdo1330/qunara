import assert from "node:assert/strict";
import test from "node:test";
import { selectLotusArtwork } from "../src/lib/path-of-seeing-artwork-selection";
import type { LotusArtwork } from "../src/types/path-of-seeing-artwork";

const artwork=(id:string):LotusArtwork=>({id,variant:id,portraitUrl:`/${id}/portrait`,landscapeUrl:`/${id}/landscape`});
const catalog=[artwork("moonlit"),artwork("dawn"),artwork("mist")];

test("artwork selection is stable for a session seed",()=>{
  assert.equal(selectLotusArtwork(catalog,"session-42")?.id,selectLotusArtwork(catalog,"session-42")?.id);
});

test("artwork selection avoids the immediately previous artwork",()=>{
  for(const previous of catalog)assert.notEqual(selectLotusArtwork(catalog,"session-42",previous.id)?.id,previous.id);
});

test("single-artwork and empty catalogs use safe fallbacks",()=>{
  assert.equal(selectLotusArtwork([catalog[0]],"seed",catalog[0].id)?.id,catalog[0].id);
  assert.equal(selectLotusArtwork([],"seed"),null);
});

