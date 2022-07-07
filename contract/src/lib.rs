/*
 * Learn more about writing NEAR smart contracts with Rust:
 * https://near-docs.io/develop/Contract
 *
 */
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::{log, near_bindgen, env, AccountId, PanicOnDefault,
                serde::{Deserialize, Serialize}};
use near_sdk::{collections::*, Promise};

// Define the contract structure
#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, Debug)]
//#[serde(crate = "near_sdk::serde")]

pub struct Contract {
    songs_by_artist: UnorderedMap<AccountId, SongList>,
}

//#[derive(BorshDeserialize, BorshSerialize, Debug)]
#[derive(BorshDeserialize, BorshSerialize, Deserialize, Serialize, Debug)]
#[serde(crate = "near_sdk::serde")]
pub struct SongList {
    songs: Vec<SongInfo>,
}

impl Default for SongList {
    fn default() -> Self{
        SongList{
            songs: Vec::new(),
        }
    }
}

#[derive(BorshDeserialize, BorshSerialize, Deserialize, Serialize, Debug)]
#[serde(crate = "near_sdk::serde")]
pub struct SongInfo {
    song_name: String,
    price: f32
}

// 1 Ⓝ in yoctoNEAR
const YOCTO_AMOUNT: u128 = 1_000_000_000_000_000_000_000_000;

// Define the default, which automatically initializes the contract

impl Default for Contract{
    fn default() -> Self{
        log!("default!");
        Self{
            songs_by_artist: UnorderedMap::new(b"s".to_vec()),
        }
    }
}

// Implement the contract structure
#[near_bindgen]
impl Contract {
    /* 
    #[init]
    pub fn new() -> Self {
        log!("#[init]");
        Self {
            songs_by_artist: UnorderedMap::new(b"s"),
        }
    }
    */
    
    // Public method - returns the greeting saved, defaulting to DEFAULT_MESSAGE
    pub fn get_greeting(&self) -> String {
        todo!()
    }

    pub fn set_greeting(&mut self, message: String) {
        // Use env::log to record logs permanently to the blockchain!
    }

    //Public method - accepts song name and price, and adds aong to artist's catalog
    pub fn add_song_info(&mut self, song_name: String, price: f32) {
       let get_songinfo = self.songs_by_artist.get(&env::predecessor_account_id()).unwrap_or_default();
       log!("songinfo: {:?}", &get_songinfo);
       let mut get_song_list = get_songinfo.songs;
       let mut song_list = get_song_list;
       song_list.push(SongInfo{song_name: song_name, price});
       self.songs_by_artist.insert(&env::predecessor_account_id(), 
       &SongList{songs: song_list});
       log!("songlist: {:?}", self.songs_by_artist.get(&env::predecessor_account_id()).unwrap().songs);
      // log!("get_song: {:?}", get_song_list[0].song_name);
    }
    //Public method - returns entire song catalog
    //pub fn get_song_catalog(&self, account_id: AccountId) -> SongList {
    pub fn get_song_catalog(&self) -> Vec<(AccountId, SongList)> {
      log!("get_song_catalog called");
      //log!("get songs by id {:?}", self.songs_by_artist.get(&account_id).unwrap_or_default());
        //  SongList{songs: vec![SongInfo{song_name: "testnamefromrust".to_string(), price: 11.0}]}
      //self.songs_by_artist.get(&account_id).unwrap_or_default()
    self.songs_by_artist.to_vec()
    }

    #[payable]
    pub fn buy_song (artist: AccountId, song_name: String, price: f32) {
        Promise::new(artist).transfer(env::attached_deposit());
        log!("song purchased {} {}", song_name, price);
    }

    /* 
    pub fn remove_song_info(&mut self, account_id:AccountId, key:u8) {
        assert(caller==same_acct_that added_song)
        let get_songinfo = self.songs_by_artist.get(&account_id).unwrap_or_default();
        log!("songinfo: {:?}", &get_songinfo);
        let mut get_song_list = get_songinfo.songs;
        let mut song_list = get_song_list;
        remove by key?
        song_list.remove(key)
    }
     */
    
    
/* 
    pub fn set_status(&mut self, status: String) {
        self.songs_by_artist.insert(&env::predecessor_account_id(), &status);
        // Note, don't need to check size, since `UnorderedMap` doesn't store all data in memory.
    }

    pub fn delete_status(&mut self) {
        self.songs_by_artist.remove(&env::predecessor_account_id());
    }

    */
}

/*
 * The rest of this file holds the inline tests for the code above
 * Learn more about Rust tests: https://doc.rust-lang.org/book/ch11-01-writing-tests.html
 */
#[cfg(test)]
mod tests {
    use super::*;
/*
    #[test]
    #[ignore]
    fn get_default_greeting() {
        let contract = Contract::default();
        // this test did not call set_greeting so should return the default "Hello" greeting
        assert_eq!(
            contract.get_greeting(),
            "Hello".to_string()
        );
    }

    #[test]
    #[ignore = "not yet implemented"]
    fn set_then_get_greeting() {
        let mut contract = Contract::default();
        contract.set_greeting("howdy".to_string());
        assert_eq!(
            contract.get_greeting(),
            "howdy".to_string()
        );
    }
    */
}
