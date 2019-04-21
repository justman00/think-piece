import React, { createContext, Component } from "react";
import { auth, createUserProfileDocument } from "../firebase";

export const UserContext = createContext({ user: null });

class UserProvider extends Component {
  state = { user: null };

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      const user = await createUserProfileDocument(userAuth);

      this.setState({ user });
    });
  }

  componentWillUnmount = () => {
    this.unsubscrbeFromAuth();
  };

  render() {
    const { children } = this.props;
    const { user } = this.state;

    return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
  }
}

export default UserProvider;
