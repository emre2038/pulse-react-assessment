export const unwrap = (response) => {
    if (!response?.data?.success) {
        throw new Error('API returned unsuccessful response')
    }

    return response.data.data
}
