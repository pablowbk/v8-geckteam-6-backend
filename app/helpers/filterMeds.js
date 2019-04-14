
const filterMeds = (filter, needle, meds) => {
	const loweredCasedNeedle = needle.toLowerCase();
	return meds.filter(medication => medication[filter].toLowerCase().includes(loweredCasedNeedle));
};

module.exports = filterMeds;
