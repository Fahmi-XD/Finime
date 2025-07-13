export interface IotakudesuStreamModel {
  episode_id?:     number;
  likeCount?:      number;
  dislikeCount?:   number;
  userLikeStatus?: number;
  reso?:           string[];
  stream?:         Stream[];
}

export interface Stream {
  reso?:    string;
  link?:    string;
  provide?: number;
}
