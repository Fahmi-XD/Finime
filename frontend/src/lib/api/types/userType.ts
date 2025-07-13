import type { Component } from "svelte";

export interface IGetAllBadges {
  id: string;
  name: string;
  icon: Component;
}

export interface IUpdateUser {
  username?: string;
  name?: string;
  avatar?: string;
  email?: string;
  bio?: string;
  banner?: string;
  pronoun?: string;
}
