export const getPercentageFilled = (user) => {
  const skipTopLevel = ["_id", "name", "email", "mobileNo", "password", "resetPasswordToken", "resetPasswordExpires", "createdAt", "updatedAt", "__v"];
  const requiredTopLevelSections = [
    "personalInfo",
    "enrollmentDetails",
    "academicBackground",
    "academicInfo",
    "curricularInfo",
    "careerProgression",
    "miscellaneous",
  ];

  let filled = 0;
  let total = 0;

  const isFilledValue = (v) => {
    if (typeof v === "string") return v.trim() !== "";
    if (typeof v === "number" || typeof v === "boolean") return true;
    if (Array.isArray(v)) return v.length > 0 && v.some(isFilledValue);
    if (typeof v === "object" && v !== null) return Object.values(v).some(isFilledValue);
    return false;
  };

  const countFilled = (val) => {
    if (Array.isArray(val)) {
      for (const item of val) countFilled(item);
    } else if (typeof val === "object" && val !== null) {
      for (const key in val) {
        countFilled(val[key]);
      }
    } else {
      total++;
      if (isFilledValue(val)) filled++;
    }
  };

  // Loop through only required sections
  for (const section of requiredTopLevelSections) {
    const sectionData = user[section];

    if (sectionData === undefined || sectionData === null) {
      // If entire section is missing, count as unfilled
      total++;
    } else {
      countFilled(sectionData);
    }
  }

  return total === 0 ? 0 : Math.round((filled / total) * 100);
};