module MyModule::MakerspacePass {
    use aptos_framework::signer;
    use std::string::{Self, String};
    use std::vector;

    /// Struct representing a Makerspace Access Pass NFT
    struct AccessPass has store, key {
        pass_id: u64,                    // Unique pass identifier
        member_name: String,             // Name of the member
        certifications: vector<String>,  // List of machine certifications
        safety_training: bool,           // Safety training completion status
        creation_timestamp: u64,         // Pass creation time
    }

    /// Counter for generating unique pass IDs
    struct PassCounter has key {
        count: u64,
    }

    /// Initialize the pass counter (called once during deployment)
    public fun initialize_counter(admin: &signer) {
        let counter = PassCounter { count: 0 };
        move_to(admin, counter);
    }

    /// Function to create/mint a new Makerspace Access Pass
    public fun create_access_pass(
        member: &signer, 
        member_name: String, 
        timestamp: u64
    ) acquires PassCounter {
        let member_address = signer::address_of(member);
        
        // Get and increment pass counter
        let counter = borrow_global_mut<PassCounter>(@MyModule);
        counter.count = counter.count + 1;
        
        let access_pass = AccessPass {
            pass_id: counter.count,
            member_name,
            certifications: vector::empty<String>(),
            safety_training: false,
            creation_timestamp: timestamp,
        };
        
        move_to(member, access_pass);
    }

    /// Function to add machine certification or complete safety training
    public fun add_certification(
        member_address: address, 
        certification_type: String, 
        is_safety_training: bool
    ) acquires AccessPass {
        let access_pass = borrow_global_mut<AccessPass>(member_address);
        
        if (is_safety_training) {
            access_pass.safety_training = true;
        } else {
            vector::push_back(&mut access_pass.certifications, certification_type);
        };
    }
}