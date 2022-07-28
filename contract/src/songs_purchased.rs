use near_sdk::AccountId;

//contains code for storing and retrieving song info a user has purchased
use  near_sdk::log;

pub fn add_song_to_user_dashboard(user_id: AccountId, song_name: String) {
    log!("{} {}", user_id, song_name);
}