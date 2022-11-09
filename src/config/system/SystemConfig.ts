export interface SystemConfig {
    privateKeyPath: string
    db: {
        pass: string,
        user: string,
        name: string
    }
}