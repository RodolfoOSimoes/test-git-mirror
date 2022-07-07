export function hasTrackOnHistory(history: any, trackId: string): boolean {
  const track: any = history.data.find(
    (item: any) => item.type === 'track' && item.id === parseInt(trackId),
  );
  return !!track;
}
