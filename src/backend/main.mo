import Map "mo:core/Map";
import Text "mo:core/Text";
import Principal "mo:core/Principal";

actor {
  // Persistent data storage for user messages
  let messages = Map.empty<Principal, Text>();

  // Add a new romantic message
  public shared ({ caller }) func addMessage(message : Text) : async () {
    messages.add(caller, message);
  };

  // Retrieve a specific user's message
  public query ({ caller }) func getMessage(user : Principal) : async ?Text {
    messages.get(user);
  };

  // Check if a message exists for a user
  public query ({ caller }) func hasMessage(user : Principal) : async Bool {
    messages.containsKey(user);
  };

  // Get the total number of messages
  public query ({ caller }) func getMessageCount() : async Nat {
    messages.size();
  };
};
