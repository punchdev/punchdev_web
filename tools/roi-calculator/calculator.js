/**
 * ROI Calculator - PDF Generation & Email Integration
 * punchDev Marketing
 */

// Formspree endpoint
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xdakqwrv';

/**
 * Generate PDF Report
 * Uses jsPDF for client-side PDF generation
 */
async function generatePDFReport(calculatorData) {
    // Load jsPDF dynamically
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const primaryColor = [196, 30, 58]; // Punch red
    const textColor = [10, 10, 11]; // Black
    const grayColor = [161, 161, 170]; // Gray

    // Helper function to format currency
    const formatCurrency = (value) => {
        return '$' + Math.round(value).toLocaleString('en-US');
    };

    // Page 1: Cover
    doc.setFillColor(...primaryColor);
    doc.rect(0, 0, 210, 60, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(32);
    doc.setFont(undefined, 'bold');
    doc.text('ROI Analysis Report', 105, 30, { align: 'center' });

    doc.setFontSize(16);
    doc.setFont(undefined, 'normal');
    doc.text('SDR vs AI Lead Generation', 105, 45, { align: 'center' });

    // Company name if provided
    doc.setFontSize(12);
    const companyText = calculatorData.email ? 'Prepared for ' + calculatorData.email.split('@')[1] : 'Your Company';
    doc.text(companyText, 105, 70, { align: 'center' });

    // Date
    doc.setTextColor(...grayColor);
    doc.setFontSize(10);
    const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    doc.text('Generated on ' + date, 105, 80, { align: 'center' });

    // punchDev branding
    doc.setFontSize(14);
    doc.setTextColor(...primaryColor);
    doc.text('punchDev Marketing', 105, 270, { align: 'center' });
    doc.setFontSize(10);
    doc.setTextColor(...grayColor);
    doc.text('AI-Powered Lead Generation for B2B SaaS', 105, 278, { align: 'center' });

    // Page 2: Executive Summary
    doc.addPage();
    doc.setTextColor(...primaryColor);
    doc.setFontSize(24);
    doc.setFont(undefined, 'bold');
    doc.text('Executive Summary', 20, 25);

    doc.setTextColor(...textColor);
    doc.setFontSize(12);
    doc.setFont(undefined, 'normal');

    const summaryY = 40;
    const lineHeight = 8;

    doc.text('Your Analysis:', 20, summaryY);
    doc.setFont(undefined, 'bold');
    doc.text(`• Monthly meeting goal: ${calculatorData.meetingsPerMonth}`, 25, summaryY + lineHeight);
    doc.text(`• Location: ${calculatorData.location}`, 25, summaryY + lineHeight * 2);
    doc.text(`• SDRs required: ${calculatorData.sdrsNeeded}`, 25, summaryY + lineHeight * 3);

    doc.setFont(undefined, 'normal');
    doc.text('Cost Comparison:', 20, summaryY + lineHeight * 5);
    doc.setFont(undefined, 'bold');
    doc.text(`• Traditional SDR Team: ${formatCurrency(calculatorData.totalSDRCost)}/year`, 25, summaryY + lineHeight * 6);
    doc.setTextColor(...primaryColor);
    doc.text(`• AI Lead Generation: ${formatCurrency(calculatorData.annualAICost)}/year`, 25, summaryY + lineHeight * 7);

    doc.setTextColor(...[16, 185, 129]); // Green
    doc.setFontSize(14);
    doc.text(`Annual Savings: ${formatCurrency(calculatorData.savings)}`, 25, summaryY + lineHeight * 9);
    doc.setFontSize(12);
    doc.setTextColor(...grayColor);
    doc.text(`(${calculatorData.savingsPercent}% cost reduction)`, 25, summaryY + lineHeight * 10);

    // Key Finding Box
    doc.setFillColor(250, 250, 250);
    doc.rect(20, summaryY + lineHeight * 12, 170, 40, 'F');
    doc.setDrawColor(...primaryColor);
    doc.setLineWidth(2);
    doc.rect(20, summaryY + lineHeight * 12, 170, 40);

    doc.setTextColor(...textColor);
    doc.setFont(undefined, 'bold');
    doc.setFontSize(14);
    doc.text('Key Finding:', 30, summaryY + lineHeight * 13);
    doc.setFont(undefined, 'normal');
    doc.setFontSize(11);

    const finding = `By switching to AI-powered lead generation, you could save ${formatCurrency(calculatorData.savings)} ` +
                    `annually while maintaining ${calculatorData.meetingsPerMonth} qualified meetings per month. ` +
                    `That's a ${calculatorData.savingsPercent}% reduction in cost-per-meeting.`;

    const findingLines = doc.splitTextToSize(finding, 160);
    doc.text(findingLines, 30, summaryY + lineHeight * 14 + 5);

    // Page 3: Detailed Cost Breakdown
    doc.addPage();
    doc.setTextColor(...primaryColor);
    doc.setFontSize(24);
    doc.setFont(undefined, 'bold');
    doc.text('Detailed Cost Breakdown', 20, 25);

    doc.setTextColor(...textColor);
    doc.setFontSize(16);
    doc.text('Traditional SDR Team Costs', 20, 40);

    doc.setFontSize(11);
    doc.setFont(undefined, 'normal');
    let yPos = 50;

    const sdrBreakdown = [
        { label: 'Base Salary (per SDR)', value: formatCurrency(calculatorData.baseSalary) },
        { label: 'Benefits (25%)', value: formatCurrency(calculatorData.baseSalary * 0.25) },
        { label: 'Tools & Software', value: '$2,400/year' },
        { label: 'Ramp Cost (lost productivity)', value: formatCurrency(calculatorData.rampCost) },
        { label: 'Turnover Cost (replacement)', value: formatCurrency(calculatorData.turnoverCost) },
        { label: 'Management Overhead', value: calculatorData.managementCost > 0 ? formatCurrency(calculatorData.managementCost) : 'N/A' }
    ];

    sdrBreakdown.forEach(item => {
        doc.text(item.label, 25, yPos);
        doc.text(item.value, 180, yPos, { align: 'right' });
        yPos += 7;
    });

    doc.setLineWidth(0.5);
    doc.line(25, yPos, 185, yPos);
    yPos += 8;

    doc.setFont(undefined, 'bold');
    doc.text(`Cost per SDR:`, 25, yPos);
    doc.text(formatCurrency(calculatorData.totalSDRCost / calculatorData.sdrsNeeded), 180, yPos, { align: 'right' });
    yPos += 8;

    doc.text(`× ${calculatorData.sdrsNeeded} SDRs =`, 25, yPos);
    doc.setFontSize(14);
    doc.text(formatCurrency(calculatorData.totalSDRCost), 180, yPos, { align: 'right' });

    // AI Cost Breakdown
    yPos += 20;
    doc.setTextColor(...primaryColor);
    doc.setFontSize(16);
    doc.text('AI Lead Generation Costs', 20, yPos);

    doc.setTextColor(...textColor);
    doc.setFontSize(11);
    doc.setFont(undefined, 'normal');
    yPos += 10;

    const aiBreakdown = [
        { label: 'Setup & Onboarding (one-time)', value: '$2,500' },
        { label: `Monthly Service Fee`, value: formatCurrency(calculatorData.monthlyFee) },
        { label: 'Annual Service Cost (12 months)', value: formatCurrency(calculatorData.monthlyFee * 12) }
    ];

    aiBreakdown.forEach(item => {
        doc.text(item.label, 25, yPos);
        doc.text(item.value, 180, yPos, { align: 'right' });
        yPos += 7;
    });

    doc.setLineWidth(0.5);
    doc.line(25, yPos, 185, yPos);
    yPos += 8;

    doc.setFont(undefined, 'bold');
    doc.setFontSize(14);
    doc.setTextColor(...primaryColor);
    doc.text('Total Year 1:', 25, yPos);
    doc.text(formatCurrency(calculatorData.annualAICost), 180, yPos, { align: 'right' });

    // Methodology note
    yPos += 20;
    doc.setTextColor(...grayColor);
    doc.setFontSize(9);
    doc.setFont(undefined, 'italic');
    const methodNote = 'Methodology: SDR costs include base salary, benefits (25%), tools ($200/mo), ramp cost (lost productivity), ' +
                       'turnover cost (replacement + training), and management overhead (for teams >3 SDRs). AI costs are based on ' +
                       'punchDev\'s volume-based pricing structure.';
    const methodLines = doc.splitTextToSize(methodNote, 170);
    doc.text(methodLines, 20, yPos);

    // Page 4: ROI Metrics
    doc.addPage();
    doc.setTextColor(...primaryColor);
    doc.setFontSize(24);
    doc.setFont(undefined, 'bold');
    doc.text('ROI Metrics & Comparison', 20, 25);

    doc.setTextColor(...textColor);
    doc.setFontSize(12);
    doc.setFont(undefined, 'normal');

    // Metrics boxes
    const metrics = [
        {
            title: 'Cost Per Meeting',
            sdr: formatCurrency(calculatorData.sdrCostPerMeeting),
            ai: formatCurrency(calculatorData.aiCostPerMeeting),
            savings: formatCurrency(calculatorData.sdrCostPerMeeting - calculatorData.aiCostPerMeeting)
        },
        {
            title: 'Annual Meetings',
            sdr: (calculatorData.meetingsPerMonth * 12).toString(),
            ai: (calculatorData.meetingsPerMonth * 12).toString(),
            savings: 'Same output'
        },
        {
            title: 'Break-even Period',
            sdr: 'N/A',
            ai: calculatorData.breakEvenMonths < 1 ? '< 1 month' : Math.ceil(calculatorData.breakEvenMonths) + ' months',
            savings: 'Immediate ROI'
        }
    ];

    let metricY = 45;
    metrics.forEach((metric, index) => {
        // Title
        doc.setFontSize(14);
        doc.setFont(undefined, 'bold');
        doc.text(metric.title, 20, metricY);

        // Values
        doc.setFontSize(11);
        doc.setFont(undefined, 'normal');
        doc.text('SDR Team:', 25, metricY + 8);
        doc.text(metric.sdr, 70, metricY + 8);

        doc.setTextColor(...primaryColor);
        doc.text('AI Lead Gen:', 25, metricY + 15);
        doc.text(metric.ai, 70, metricY + 15);

        doc.setTextColor(...[16, 185, 129]);
        doc.text('Difference:', 25, metricY + 22);
        doc.text(metric.savings, 70, metricY + 22);

        // Separator
        if (index < metrics.length - 1) {
            doc.setDrawColor(...grayColor);
            doc.setLineWidth(0.3);
            doc.line(20, metricY + 30, 190, metricY + 30);
        }

        metricY += 45;
        doc.setTextColor(...textColor);
    });

    // 3-Year Projection
    doc.setTextColor(...primaryColor);
    doc.setFontSize(16);
    doc.setFont(undefined, 'bold');
    doc.text('3-Year Cost Projection', 20, metricY + 10);

    doc.setTextColor(...textColor);
    doc.setFontSize(11);
    doc.setFont(undefined, 'normal');

    const projectionY = metricY + 25;
    const colWidth = 50;

    // Table headers
    doc.setFont(undefined, 'bold');
    doc.text('Year', 25, projectionY);
    doc.text('SDR Team', 60, projectionY);
    doc.text('AI Lead Gen', 120, projectionY);
    doc.text('Savings', 170, projectionY, { align: 'right' });

    doc.setFont(undefined, 'normal');
    doc.line(20, projectionY + 2, 190, projectionY + 2);

    // Year 1
    let rowY = projectionY + 10;
    doc.text('1', 25, rowY);
    doc.text(formatCurrency(calculatorData.year1SDR), 60, rowY);
    doc.setTextColor(...primaryColor);
    doc.text(formatCurrency(calculatorData.year1AI), 120, rowY);
    doc.setTextColor(...[16, 185, 129]);
    doc.text(formatCurrency(calculatorData.year1SDR - calculatorData.year1AI), 170, rowY, { align: 'right' });

    // Year 2
    rowY += 10;
    doc.setTextColor(...textColor);
    doc.text('2', 25, rowY);
    doc.text(formatCurrency(calculatorData.year2SDR), 60, rowY);
    doc.setTextColor(...primaryColor);
    doc.text(formatCurrency(calculatorData.year2AI), 120, rowY);
    doc.setTextColor(...[16, 185, 129]);
    doc.text(formatCurrency(calculatorData.year2SDR - calculatorData.year2AI), 170, rowY, { align: 'right' });

    // Year 3
    rowY += 10;
    doc.setTextColor(...textColor);
    doc.text('3', 25, rowY);
    doc.text(formatCurrency(calculatorData.year3SDR), 60, rowY);
    doc.setTextColor(...primaryColor);
    doc.text(formatCurrency(calculatorData.year3AI), 120, rowY);
    doc.setTextColor(...[16, 185, 129]);
    doc.text(formatCurrency(calculatorData.year3SDR - calculatorData.year3AI), 170, rowY, { align: 'right' });

    // Total
    rowY += 5;
    doc.setLineWidth(0.5);
    doc.line(20, rowY, 190, rowY);
    rowY += 10;

    doc.setFont(undefined, 'bold');
    doc.setTextColor(...textColor);
    doc.text('Total', 25, rowY);
    doc.text(formatCurrency(calculatorData.total3YearSDR), 60, rowY);
    doc.setTextColor(...primaryColor);
    doc.text(formatCurrency(calculatorData.total3YearAI), 120, rowY);
    doc.setTextColor(...[16, 185, 129]);
    doc.setFontSize(12);
    doc.text(formatCurrency(calculatorData.total3YearSavings), 170, rowY, { align: 'right' });

    // Page 5: Recommendations
    doc.addPage();
    doc.setTextColor(...primaryColor);
    doc.setFontSize(24);
    doc.setFont(undefined, 'bold');
    doc.text('Recommendations', 20, 25);

    doc.setTextColor(...textColor);
    doc.setFontSize(12);
    doc.setFont(undefined, 'normal');

    const recommendations = getRecommendations(calculatorData);

    let recY = 40;
    recommendations.forEach((rec, index) => {
        doc.setFont(undefined, 'bold');
        doc.setFontSize(13);
        doc.text(`${index + 1}. ${rec.title}`, 20, recY);

        doc.setFont(undefined, 'normal');
        doc.setFontSize(11);
        const recLines = doc.splitTextToSize(rec.text, 170);
        doc.text(recLines, 25, recY + 7);

        recY += 7 + (recLines.length * 5) + 8;

        if (recY > 250) {
            doc.addPage();
            recY = 25;
        }
    });

    // Page 6: Next Steps
    doc.addPage();
    doc.setTextColor(...primaryColor);
    doc.setFontSize(24);
    doc.setFont(undefined, 'bold');
    doc.text('Next Steps', 20, 25);

    doc.setTextColor(...textColor);
    doc.setFontSize(12);
    doc.setFont(undefined, 'normal');

    const nextSteps = [
        '1. Review this analysis with your leadership team',
        '2. Book a free strategy call with punchDev to discuss your specific needs',
        '3. Get a custom implementation plan tailored to your ICP and industry',
        '4. Start with a 30-day pilot to validate results',
        '5. Scale gradually as you see ROI'
    ];

    let stepY = 45;
    nextSteps.forEach(step => {
        doc.text(step, 25, stepY);
        stepY += 10;
    });

    // CTA Box
    stepY += 10;
    doc.setFillColor(...primaryColor);
    doc.rect(20, stepY, 170, 50, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.setFont(undefined, 'bold');
    doc.text('Ready to Get Started?', 105, stepY + 15, { align: 'center' });

    doc.setFontSize(12);
    doc.setFont(undefined, 'normal');
    doc.text('Book a free 15-minute strategy call to discuss your results', 105, stepY + 25, { align: 'center' });

    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('https://punchdev.net/book.html', 105, stepY + 38, { align: 'center' });

    // Footer
    doc.setTextColor(...grayColor);
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.text('punchDev Marketing | georges@punchdev.net | punchdev.net', 105, 280, { align: 'center' });

    return doc;
}

/**
 * Get personalized recommendations based on calculator data
 */
function getRecommendations(data) {
    const recommendations = [];

    if (data.sdrsNeeded >= 3) {
        recommendations.push({
            title: 'Consider Hybrid Approach',
            text: `With ${data.sdrsNeeded} SDRs needed, consider a hybrid approach: Keep your best 1-2 SDRs for complex accounts while using AI for high-volume prospecting. This balances personalization with efficiency.`
        });
    }

    if (data.savingsPercent > 70) {
        recommendations.push({
            title: 'Immediate ROI Opportunity',
            text: `Your ${data.savingsPercent}% potential cost reduction suggests AI lead generation would deliver immediate ROI. We recommend starting with a 30-day pilot to validate these projections with your specific ICP.`
        });
    }

    if (data.meetingsPerMonth >= 25) {
        recommendations.push({
            title: 'Scale Considerations',
            text: `At ${data.meetingsPerMonth} meetings/month, you're in high-volume territory. AI excels at this scale by maintaining consistent quality across large volumes without adding headcount.`
        });
    }

    recommendations.push({
        title: 'Implementation Timeline',
        text: 'AI lead generation can be operational in 7-14 days vs. 3-6 months to hire and ramp SDRs. This faster time-to-value means you start seeing pipeline impact immediately while saving on recruitment costs.'
    });

    recommendations.push({
        title: 'Risk Mitigation',
        text: 'Unlike SDR hires, AI lead generation has no ramp risk, no turnover risk, and predictable monthly costs. This makes forecasting easier and reduces the financial risk of scaling outbound.'
    });

    return recommendations;
}

/**
 * Submit form to Formspree and generate PDF
 */
async function submitForm(formData, calculatorData) {
    try {
        // Submit to Formspree
        const response = await fetch(FORMSPREE_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: formData.email,
                goal: formData.goal,
                meetingGoal: calculatorData.meetingsPerMonth,
                location: calculatorData.location,
                savings: calculatorData.savings,
                sdrCost: calculatorData.totalSDRCost,
                aiCost: calculatorData.annualAICost
            })
        });

        if (!response.ok) {
            throw new Error('Form submission failed');
        }

        // Generate and download PDF
        const pdf = await generatePDFReport({
            ...calculatorData,
            email: formData.email,
            goal: formData.goal
        });

        const filename = `punchDev-ROI-Report-${new Date().toISOString().split('T')[0]}.pdf`;
        pdf.save(filename);

        return { success: true };
    } catch (error) {
        console.error('Error:', error);
        return { success: false, error };
    }
}

// Export for use in main HTML
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { generatePDFReport, submitForm };
}
