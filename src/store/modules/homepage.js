import axios from "axios";

const state = {
  homepageInstance: null,
  navigationBarColor: "rgba(0, 0, 0, 0.6)",
  token: ""
};

const mutations = {
  setHomepageInstance: (state, homepageInstance) => {
    state.homepageInstance = homepageInstance;
  },
  setNavigationBarColor: (state, navigationBarColor) => {
    state.navigationBarColor = navigationBarColor;
  }
};

const actions = {
  async openStripeForm({ state }, payload) {
    state.stripe = payload.stripe;

    const session = await axios.get("/v1/me/checkout-session", {
      headers: {
        Authorization: payload.token
      }
    });
    await payload.stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
