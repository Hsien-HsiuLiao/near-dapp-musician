use near_sdk::AccountId;

//contains code for storing and retrieving song info a user has purchased
use near_sdk::log;

//user songlist struct, vec<songs>
//hashmap

pub fn add_song_to_user_dashboard(user_id: &AccountId, song_name: String) {
    log!("{} {}", user_id, song_name);
    //hashmap add songs by user
    //hashmap key: user_id, value: Vec <songs>
}

//pub fn get_user_purchases(user_id) -> vec<songs> {}
