exports.assertSafeName = (raw) => {
	if (typeof raw !== 'string' || !raw.trim()) {
		throw new Error('Name is required.');
	}
	if (!/^[A-Za-z][A-Za-z0-9_-]*$/.test(raw)) {
		throw new Error('Name must start with a letter and contain only letters, numbers, _ or -');
	}
};
