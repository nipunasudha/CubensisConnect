const ObservableStore = require('obs-store');

/**
 * An ObservableStore that can composes a flat
 * structure of child stores based on configuration
 */
class ComposableObservableStore extends ObservableStore {
  /**
   * Composes a new internal store subscription structure
   *
   * @param {Object} [config] - Map of internal state keys to child stores
   */
  updateStructure(config) {
    this.config = config;
    this.removeAllListeners();
    for (const key in config) {
      // set initial substore state
      const state = config[key].getState();
      this.updateState({ [key]: state });

      // subscribe to substore update
      config[key].subscribe(state => {
        this.updateState({ [key]: state });
      });
    }
  }

  /**
   * Merges all child store state into a single object rather than
   * returning an object keyed by child store class name
   *
   * @returns {Object} - Object containing merged child store state
   */
  getFlatState() {
    let flatState = {};
    for (const key in this.config) {
      flatState = { ...flatState, ...this.config[key].getState() };
    }
    return flatState;
  }

  getKeys() {
    return Object.keys(this.config);
  }
}

module.exports = {
  ComposableObservableStore,
};
