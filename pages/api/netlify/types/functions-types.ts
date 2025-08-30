export interface GetGuests {
    id: string,
    name?: string,
    guestListDetails?: string,
    assignedTickets?: number,
    confirmedTickets?: number,
    guestList?: string,
    guestCode?: string,
    phone?: string,
    email?: string,
    confirmed?: string
}

export interface GetGuestResponse {
    id: string,
    FullName?: string,
    GuestDetailsList?: string,
    AssignedTickets?: number,
    ConfirmedTickets?: number,
    GuestList?: string,
    GuestCode?: string,
    Phone?: string,
    Email?: string,
    Confirmed?: string,
    InvitationStatus?: string
}