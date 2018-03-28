"use strict";
// tslint:disable
// TODO: cleanup this file, it's copied as is from Angular CLI.
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
const core_1 = require("@angular-devkit/core");
// Force basic color support on terminals with no color support.
// Chalk typings don't have the correct constructor parameters.
const chalkCtx = new chalk_1.default.constructor(chalk_1.default.supportsColor ? {} : { level: 1 });
const { bold, green, red, reset, white, yellow } = chalkCtx;
function formatSize(size) {
    if (size <= 0) {
        return '0 bytes';
    }
    const abbreviations = ['bytes', 'kB', 'MB', 'GB'];
    const index = Math.floor(Math.log(size) / Math.log(1000));
    return `${+(size / Math.pow(1000, index)).toPrecision(3)} ${abbreviations[index]}`;
}
exports.formatSize = formatSize;
function statsToString(json, statsConfig) {
    const colors = statsConfig.colors;
    const rs = (x) => colors ? reset(x) : x;
    const w = (x) => colors ? bold(white(x)) : x;
    const g = (x) => colors ? bold(green(x)) : x;
    const y = (x) => colors ? bold(yellow(x)) : x;
    const changedChunksStats = json.chunks
        .filter((chunk) => chunk.rendered)
        .map((chunk) => {
        const asset = json.assets.filter((x) => x.name == chunk.files[0])[0];
        const size = asset ? ` ${formatSize(asset.size)}` : '';
        const files = chunk.files.join(', ');
        const names = chunk.names ? ` (${chunk.names.join(', ')})` : '';
        const initial = y(chunk.entry ? '[entry]' : chunk.initial ? '[initial]' : '');
        const flags = ['rendered', 'recorded']
            .map(f => f && chunk[f] ? g(` [${f}]`) : '')
            .join('');
        return `chunk {${y(chunk.id)}} ${g(files)}${names}${size} ${initial}${flags}`;
    });
    const unchangedChunkNumber = json.chunks.length - changedChunksStats.length;
    if (unchangedChunkNumber > 0) {
        return rs(core_1.tags.stripIndents `
      Date: ${w(new Date().toISOString())} - Hash: ${w(json.hash)} - Time: ${w('' + json.time)}ms
      ${unchangedChunkNumber} unchanged chunks
      ${changedChunksStats.join('\n')}
      `);
    }
    else {
        return rs(core_1.tags.stripIndents `
      Date: ${w(new Date().toISOString())}
      Hash: ${w(json.hash)}
      Time: ${w('' + json.time)}ms
      ${changedChunksStats.join('\n')}
      `);
    }
}
exports.statsToString = statsToString;
function statsWarningsToString(json, statsConfig) {
    const colors = statsConfig.colors;
    const rs = (x) => colors ? reset(x) : x;
    const y = (x) => colors ? bold(yellow(x)) : x;
    return rs('\n' + json.warnings.map((warning) => y(`WARNING in ${warning}`)).join('\n\n'));
}
exports.statsWarningsToString = statsWarningsToString;
function statsErrorsToString(json, statsConfig) {
    const colors = statsConfig.colors;
    const rs = (x) => colors ? reset(x) : x;
    const r = (x) => colors ? bold(red(x)) : x;
    return rs('\n' + json.errors.map((error) => r(`ERROR in ${error}`)).join('\n'));
}
exports.statsErrorsToString = statsErrorsToString;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdHMuanMiLCJzb3VyY2VSb290IjoiLi8iLCJzb3VyY2VzIjpbInBhY2thZ2VzL2FuZ3VsYXJfZGV2a2l0L2J1aWxkX3dlYnBhY2svc3JjL2FuZ3VsYXItY2xpLWZpbGVzL3V0aWxpdGllcy9zdGF0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsaUJBQWlCO0FBQ2pCLCtEQUErRDs7QUFFL0QsaUNBQTBCO0FBQzFCLCtDQUE0QztBQUc1QyxnRUFBZ0U7QUFDaEUsK0RBQStEO0FBQy9ELE1BQU0sUUFBUSxHQUFHLElBQUssZUFBSyxDQUFDLFdBQW1CLENBQUMsZUFBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ3pGLE1BQU0sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxHQUFHLFFBQVEsQ0FBQztBQUU1RCxvQkFBMkIsSUFBWTtJQUNyQyxFQUFFLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNkLE1BQU0sQ0FBQyxTQUFTLENBQUM7SUFDbkIsQ0FBQztJQUVELE1BQU0sYUFBYSxHQUFHLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbEQsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUUxRCxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLGFBQWEsQ0FBQyxLQUFLLENBQUMsRUFBRSxD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R0FBRyxDQUFDLENBQUMsT0FBWSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsY0FBYyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFDakcsQ0FBQztBQU5ELHNEQU1DO0FBRUQsNkJBQW9DLElBQVMsRUFBRSxXQUFnQjtJQUM3RCxNQUFNLE1BQU0sR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDO0lBQ2xDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBUyxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2hELE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBUyxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRW5ELE1BQU0sQ0FBQyxFQUFFLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBVSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsWUFBWSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDdkYsQ0FBQztBQU5ELGtEQU1DIiwic291cmNlc0NvbnRlbnQiOlsiLy8gdHNsaW50OmRpc2FibGVcbi8vIFRPRE86IGNsZWFudXAgdGhpcyBmaWxlLCBpdCdzIGNvcGllZCBhcyBpcyBmcm9tIEFuZ3VsYXIgQ0xJLlxuXG5pbXBvcnQgY2hhbGsgZnJvbSAnY2hhbGsnO1xuaW1wb3J0IHsgdGFncyB9IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9jb3JlJztcblxuXG4vLyBGb3JjZSBiYXNpYyBjb2xvciBzdXBwb3J0IG9uIHRlcm1pbmFscyB3aXRoIG5vIGNvbG9yIHN1cHBvcnQuXG4vLyBDaGFsayB0eXBpbmdzIGRvbid0IGhhdmUgdGhlIGNvcnJlY3QgY29uc3RydWN0b3IgcGFyYW1ldGVycy5cbmNvbnN0IGNoYWxrQ3R4ID0gbmV3IChjaGFsay5jb25zdHJ1Y3RvciBhcyBhbnkpKGNoYWxrLnN1cHBvcnRzQ29sb3IgPyB7fSA6IHsgbGV2ZWw6IDEgfSk7XG5jb25zdCB7IGJvbGQsIGdyZWVuLCByZWQsIHJlc2V0LCB3aGl0ZSwgeWVsbG93IH0gPSBjaGFsa0N0eDtcblxuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdFNpemUoc2l6ZTogbnVtYmVyKTogc3RyaW5nIHtcbiAgaWYgKHNpemUgPD0gMCkge1xuICAgIHJldHVybiAnMCBieXRlcyc7XG4gIH1cblxuICBjb25zdCBhYmJyZXZpYXRpb25zID0gWydieXRlcycsICdrQicsICdNQicsICdHQiddO1xuICBjb25zdCBpbmRleCA9IE1hdGguZmxvb3IoTWF0aC5sb2coc2l6ZSkgLyBNYXRoLmxvZygxMDAwKSk7XG5cbiAgcmV0dXJuIGAkeysoc2l6ZSAvIE1hdGgucG93KDEwMDAsIGluZGV4KSkudG9QcmVjaXNpb24oMyl9ICR7YWJicmV2aWF0aW9uc1tpbmRleF19YDtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gc3RhdHNUb1N0cmluZyhqc29uOiBhbnksIHN0YXRzQ29uZmlnOiBhbnkpIHtcbiAgY29uc3QgY29sb3JzID0gc3RhdHNDb25maWcuY29sb3JzO1xuICBjb25zdCBycyA9ICh4OiBzdHJpbmcpID0+IGNvbG9ycyA/IHJlc2V0KHgpIDogeDtcbiAgY29uc3QgdyA9ICh4OiBzdHJpbmcpID0+IGNvbG9ycyA/IGJvbGQod2hpdGUoeCkpIDogeDtcbiAgY29uc3QgZyA9ICh4OiBzdHJpbmcpID0+IGNvbG9ycyA/IGJvbGQoZ3JlZW4oeCkpIDogeDtcbiAgY29uc3QgeSA9ICh4OiBzdHJpbmcpID0+IGNvbG9ycyA/IGJvbGQoeWVsbG93KHgpKSA6IHg7XG5cbiAgY29uc3QgY2hhbmdlZENodW5rc1N0YXRzID0ganNvbi5jaHVua3NcbiAgICAuZmlsdGVyKChjaHVuazogYW55KSA9PiBjaHVuay5yZW5kZXJlZClcbiAgICAubWFwKChjaHVuazogYW55KSA9PiB7XG4gICAgICBjb25zdCBhc3NldCA9IGpzb24uYXNzZXRzLmZpbHRlcigoeDogYW55KSA9PiB4Lm5hbWUgPT0gY2h1bmsuZmlsZXNbMF0pWzBdO1xuICAgICAgY29uc3Qgc2l6ZSA9IGFzc2V0ID8gYCAke2Zvcm1hdFNpemUoYXNzZXQuc2l6ZSl9YCA6ICcnO1xuICAgICAgY29uc3QgZmlsZXMgPSBjaHVuay5maWxlcy5qb2luKCcsICcpO1xuICAgICAgY29uc3QgbmFtZXMgPSBjaHVuay5uYW1lcyA/IGAgKCR7Y2h1bmsubmFtZXMuam9pbignLCAnKX0pYCA6ICcnO1xuICAgICAgY29uc3QgaW5pdGlhbCA9IHkoY2h1bmsuZW50cnkgPyAnW2VudHJ5XScgOiBjaHVuay5pbml0aWFsID8gJ1tpbml0aWFsXScgOiAnJyk7XG4gICAgICBjb25zdCBmbGFncyA9IFsncmVuZGVyZWQnLCAncmVjb3JkZWQnXVxuICAgICAgICAubWFwKGYgPT4gZiAmJiBjaHVua1tmXSA/IGcoYCBbJHtmfV1gKSA6ICcnKVxuICAgICAgICAuam9pbignJyk7XG5cbiAgICAgIHJldHVybiBgY2h1bmsgeyR7eShjaHVuay5pZCl9fSAke2coZmlsZXMpfSR7bmFtZXN9JHtzaXplfSAke2luaXRpYWx9JHtmbGFnc31gO1xuICAgIH0pO1xuXG4gIGNvbnN0IHVuY2hhbmdlZENodW5rTnVtYmVyID0ganNvbi5jaHVua3MubGVuZ3RoIC0gY2hhbmdlZENodW5rc1N0YXRzLmxlbmd0aDtcblxuICBpZiAodW5jaGFuZ2VkQ2h1bmtOdW1iZXIgPiAwKSB7XG4gICAgcmV0dXJuIHJzKHRhZ3Muc3RyaXBJbmRlbnRzYFxuICAgICAgRGF0ZTogJHt3KG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSl9IC0gSGFzaDogJHt3KGpzb24uaGFzaCl9IC0gVGltZTogJHt3KCcnICsganNvbi50aW1lKX1tc1xuICAgICAgJHt1bmNoYW5nZWRDaHVua051bWJlcn0gdW5jaGFuZ2VkIGNodW5rc1xuICAgICAgJHtjaGFuZ2VkQ2h1bmtzU3RhdHMuam9pbignXFxuJyl9XG4gICAgICBgKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gcnModGFncy5zdHJpcEluZGVudHNgXG4gICAgICBEYXRlOiAke3cobmV3IERhdGUoKS50b0lTT1N0cmluZygpKX1cbiAgICAgIEhhc2g6ICR7dyhqc29uLmhhc2gpfVxuICAgICAgVGltZTogJHt3KCcnICsganNvbi50aW1lKX1tc1xuICAgICAgJHtjaGFuZ2VkQ2h1bmtzU3RhdHMuam9pbignXFxuJyl9XG4gICAgICBgKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc3RhdHNXYXJuaW5nc1RvU3RyaW5nKGpzb246IGFueSwgc3RhdHNDb25maWc6IGFueSkge1xuICBjb25zdCBjb2xvcnMgPSBzdGF0c0NvbmZpZy5jb2xvcnM7XG4gIGNvbnN0IHJzID0gKHg6IHN0cmluZykgPT4gY29sb3JzID8gcmVzZXQoeCkgOiB4O1xuICBjb25zdCB5ID0gKHg6IHN0cmluZykgPT4gY29sb3JzID8gYm9sZCh5ZWxsb3coeCkpIDogeDtcblxuICByZXR1cm4gcnMoJ1xcbicgKyBqc29uLndhcm5pbmdzLm1hcCgod2FybmluZzogYW55KSA9PiB5KGBXQVJOSU5HIGluICR7d2FybmluZ31gKSkuam9pbignXFxuXFxuJykpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3RhdHNFcnJvcnNUb1N0cmluZyhqc29uOiBhbnksIHN0YXRzQ29uZmlnOiBhbnkpIHtcbiAgY29uc3QgY29sb3JzID0gc3RhdHNDb25maWcuY29sb3JzO1xuICBjb25zdCBycyA9ICh4OiBzdHJpbmcpID0+IGNvbG9ycyA/IHJlc2V0KHgpIDogeDtcbiAgY29uc3QgciA9ICh4OiBzdHJpbmcpID0+IGNvbG9ycyA/IGJvbGQocmVkKHgpKSA6IHg7XG5cbiAgcmV0dXJuIHJzKCdcXG4nICsganNvbi5lcnJvcnMubWFwKChlcnJvcjogYW55KSA9PiByKGBFUlJPUiBpbiAke2Vycm9yfWApKS5qb2luKCdcXG4nKSk7XG59XG4iXX0=