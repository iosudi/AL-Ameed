export const formatDate = (dateString: string | undefined, i18n: string) => {
    if (dateString) {
        const date = new Date(dateString);


        // Check if current language is Arabic
        const isArabic = i18n === 'ar';

        if (isArabic) {
            // Arabic months
            const arabicMonths = [
                'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
                'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
            ];

            const day = date.getDate();
            const month = arabicMonths[date.getMonth()];
            const year = date.getFullYear();

            return `${day} ${month} , ${year}`;
        } else {
            // English months (abbreviated)
            const englishMonths = [
                'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
            ];

            const day = date.getDate();
            const month = englishMonths[date.getMonth()];
            const year = date.getFullYear();

            return `${day} ${month} , ${year}`;
        }

    }
};