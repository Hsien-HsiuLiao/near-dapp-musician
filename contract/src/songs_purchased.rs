use near_sdk::AccountId;
use near_sdk::{collections::*, env};

//contains code for storing and retrieving song info a user has purchased
use near_sdk::log;

use crate::{SongList, SongInfo};

//user songlist struct, vec<songs>
//hashmap
type UserId = AccountId;

pub struct UserSongList {
    songs_purchased_by_user: UnorderedMap<UserId, SongList>,
}

impl UserSongList {
    pub fn add_song_to_user_dashboard(&mut self, user_id: &AccountId, song_name: String) {
        log!("{} {}", user_id, song_name);
    //hashmap add songs by user
    //hashmap key: user_id, value: Vec <songs>
        self.songs_purchased_by_user.get(&env::predecessor_account_id()).unwrap_or_default();
        
        //let mut getSongInfo = self
        // .songs_purchased_by_user
        // .get(&env::predecessor_account_id())
        // .unwrap_or_default();
        //let get_song_list = getSongInfo.songs;
        //let mut song_list = get_song_list;
        self.songs_purchased_by_user
            .get(&env::predecessor_account_id())
            .unwrap_or_default()
            .songs
            .push(SongInfo {
                song_name,
                    price: 0.0
            });


    }
}

//pub fn get_user_purchases(user_id) -> vec<songs> {}
