/*
 * Learn more about writing NEAR smart contracts with Rust:
 * https://near-docs.io/develop/Contract
 *
 */
//use std::collections::HashMap;
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::{log, near_bindgen, env, AccountId, PanicOnDefault,
                serde::{Deserialize, Serialize}};
use near_sdk::collections::*;

// Define the default message
//const DEFAULT_MESSAGE: &str = "Hello";

// Define the contract structure
#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, Debug)]
//#[serde(crate = "near_sdk::serde")]

pub struct Contract {
    songs_by_artist: UnorderedMap<AccountId, SongList>,
    //songs_by_artist: UnorderedMap<AccountId, String>,
//    pub song_for_sale: String,
}
 
#[derive(BorshDeserialize, BorshSerialize, Debug)]
pub struct SongList {
    songs: Vec<SongInfo>,
//songs: Vec<String>,
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



// Define the default, which automatically initializes the contract

impl Default for Contract{
    fn default() -> Self{
        //Self{message: DEFAULT_MESSAGE.to_string()}
        log!("default!");
        Self{
            songs_by_artist: UnorderedMap::new(b"s".to_vec()),
         //   song_for_sale: "none".to_string(),
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
          //  songs_by_artist: UnorderedMap::new(b"s"),
          songs_by_artist: LookupMap::new(b"s".to_vec()),
      //      song_for_sale: "none".to_string(),
        }
    }
    */
    
    // Public method - returns the greeting saved, defaulting to DEFAULT_MESSAGE
    pub fn get_greeting(&self) -> String {
       // return self.message.clone();
       "hey yo".to_string()
    }

    // Public method - accepts a greeting, such as "howdy", and records it
    pub fn set_greeting(&mut self, message: String) {
        // Use env::log to record logs permanently to the blockchain!
        log!("Saving greeting {}", message);
        //self.message = message;
    }

    pub fn add_song_info(&mut self, song_name: String, price: f32) {
       // self.songs_by_artist.insert(&env::predecessor_account_id(), &song);
       //if SongList{songs>0}, init song_info
       //let mut song_info: Vec<SongInfo> = Vec::new();
       //song_info.push(SongInfo{song_name: song, price: 1});
       let get_songinfo = self.songs_by_artist.get(&env::predecessor_account_id()).unwrap_or_default();
       log!("songinfo: {:?}", &get_songinfo);
       let mut get_song_list = get_songinfo.songs;
       let mut song_list = get_song_list;
       song_list.push(SongInfo{song_name: song_name, price});
       self.songs_by_artist.insert(&env::predecessor_account_id(), 
       &SongList{songs: song_list});
       log!("songlist: {:?}", self.songs_by_artist.get(&env::predecessor_account_id()).unwrap().songs);
      // get_song_list.push(SongInfo{song_name: "tst".to_string(), price: 2});
      // log!("get_song: {:?}", get_song_list[0].song_name);
      // log!("predecessor: {:?}", &env::predecessor_account_id());
    }

    pub fn get_song_catalog(&self) -> UnorderedMap<AccountId, SongList> {
        //pub fn get_song_catalog(self) -> UnorderedMap<AccountId, SongList> {

       // return self.song_for_sale.clone()
      // self.songs_by_artist.get(&account_id)
      //unimplemented!()
      let song_catalog = &self.songs_by_artist;
      song_catalog.clone()
    }
/* 
    pub fn set_status(&mut self, status: String) {
        self.songs_by_artist.insert(&env::predecessor_account_id(), &status);
        // Note, don't need to check size, since `UnorderedMap` doesn't store all data in memory.
    }

    pub fn delete_status(&mut self) {
        self.songs_by_artist.remove(&env::predecessor_account_id());
    }

    pub fn get_status(&self, account_id: AccountId) -> Option<String> {
        self.songs_by_artist.get(&account_id)
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
