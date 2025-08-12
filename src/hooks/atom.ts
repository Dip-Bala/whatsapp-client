import {atom} from 'recoil';

type NavItemsTypes = "messages" | "channels" | "community" | "status";
export const navAtom  = atom<NavItemsTypes>({
    key: 'navAtom',
    default: 'messages'
})