function isNightTariff(hour = new Date().getHours()) {
  return hour >= 22 || hour < 6;
}

function calculateCourierPrice({ distanceKm = 0, weightKg = 1, serviceType = 'STANDARD', isNight, isBadWeather = false } = {}) {
  const BASE_FEE = 350;
  const INCLUDED_KM = 5;
  const PER_KM_FEE = 30;
  const EXTRA_KG_FEE = 15;

  const safeDistanceKm = Number.isFinite(Number(distanceKm)) ? Math.max(0, Number(distanceKm)) : 0;
  const safeWeightKg = Number.isFinite(Number(weightKg)) ? Math.max(0, Number(weightKg)) : 0;
  const safeServiceType = ['STANDARD', 'EXPRESS', 'VIP'].includes(serviceType) ? serviceType : 'STANDARD';
  const safeIsNight = typeof isNight === 'boolean' ? isNight : isNightTariff();

  const multipliers = {
    service: { STANDARD: 1.0, EXPRESS: 1.5, VIP: 2.2 },
    night: safeIsNight ? 1.3 : 1.0,
    weather: isBadWeather ? 1.25 : 1.0
  };

  const extraDistance = Math.max(0, safeDistanceKm - INCLUDED_KM);
  const distancePrice = BASE_FEE + (extraDistance * PER_KM_FEE);
  const extraWeightPrice = Math.max(0, safeWeightKg - 5) * EXTRA_KG_FEE;
  const subtotal = distancePrice + extraWeightPrice;
  const total = subtotal * multipliers.service[safeServiceType] * multipliers.night * multipliers.weather;

  return {
    subtotal: Math.round(subtotal),
    totalPrice: Math.round(total),
    breakdown: {
      baseFee: BASE_FEE,
      extraKm: extraDistance,
      extraDistanceFee: extraDistance * PER_KM_FEE,
      extraWeightFee: extraWeightPrice,
      serviceMultiplier: multipliers.service[safeServiceType],
      nightMultiplier: multipliers.night,
      weatherMultiplier: multipliers.weather
    }
  };
}

window.calculateCourierPrice = calculateCourierPrice;
window.isNightTariff = isNightTariff;

document.querySelectorAll('[data-price-calculator]').forEach((calculator) => {
  const read = (selector) => calculator.querySelector(selector);
  const update = () => {
    const result = calculateCourierPrice({
      distanceKm: Math.max(0, Number(read('[data-distance]').value) || 0),
      weightKg: Math.max(0, Number(read('[data-weight]').value) || 0),
      serviceType: read('[data-service]').value,
      isNight: read('[data-night]').checked || isNightTariff(),
      isBadWeather: read('[data-weather]').checked
    });
    read('[data-total]').textContent = `${result.totalPrice} TL`;
    read('[data-subtotal]').textContent = `${result.subtotal} TL`;
    read('[data-extra-km]').textContent = `${result.breakdown.extraKm.toFixed(1)} km`;
    read('[data-extra-weight]').textContent = `${result.breakdown.extraWeightFee} TL`;
    read('[data-multipliers]').textContent = `${result.breakdown.serviceMultiplier}x x ${result.breakdown.nightMultiplier}x x ${result.breakdown.weatherMultiplier}x`;
  };

  calculator.querySelectorAll('input, select').forEach((input) => {
    input.addEventListener('input', update);
    input.addEventListener('change', update);
  });
  update();
});
