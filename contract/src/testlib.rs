#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, PanicOnDefault)]
pub struct Contract {
    pub metadata: LazyOption<SongsByArtist>,
}

#[derive(Serialize, Deserialize, BorshDeserialize, BorshSerialize)]
#[serde(crate = "near_sdk::serde")]
pub struct SongsByArtist {
    songs: UnorderedMap<AccountId, SongList>,
}

#[near_bindgen]
impl Contract {
    #[init]
    pub fn new(metadata: Metadata) -> Self {
        Self {
            metadata: LazyOption::new(b"m", Some(metadata)),
        }
    }

    pub fn get_metadata(&self) -> Metadata {
        // `.get()` reads and deserializes the value from the storage. 
        self.metadata.get().unwrap()
    }
}