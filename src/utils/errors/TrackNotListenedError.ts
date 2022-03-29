class TrackNotListenedError extends Error {
  constructor(message) {
    super(message);
    this.name = 'TrackNotListenedError';
  }
}

export default TrackNotListenedError;
