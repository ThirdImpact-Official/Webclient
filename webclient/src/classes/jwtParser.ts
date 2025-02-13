
export class JwtParser
{
    /**
     * Parses a JWT token and returns the payload as a JSON object.
     *
     * @param {string} token - The JWT token to parse.
     * @returns {any} The payload of the JWT token as a JSON object.
     */
    public static parseJwt(token: string): unknown
    {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
            return '%' + (`00${c.charCodeAt(0).toString(16)}`).slice(-2);
        }).join(''));
    
        return JSON.parse(jsonPayload);
    }
    public static getPayload(): any
    {
        const cookies = document.cookie.split(';');
        const token = cookies.find(cookie => cookie.trim().startsWith('token='));
        const payload = token ? token.split('=')[1] : null;
        return payload ? this.parseJwt(payload) : null;
    }
}
