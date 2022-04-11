"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runWebpackDevServer = void 0;
const architect_1 = require("@angular-devkit/architect");
const path_1 = require("path");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const webpack_1 = __importDefault(require("webpack"));
const webpack_dev_server_1 = __importDefault(require("webpack-dev-server"));
const utils_1 = require("../utils");
function runWebpackDevServer(config, context, options = {}) {
    const createWebpack = (c) => {
        if (options.webpackFactory) {
            const result = options.webpackFactory(c);
            if ((0, rxjs_1.isObservable)(result)) {
                return result;
            }
            else {
                return (0, rxjs_1.of)(result);
            }
        }
        else {
            return (0, rxjs_1.of)((0, webpack_1.default)(c));
        }
    };
    const createWebpackDevServer = (webpack, config) => {
        if (options.webpackDevServerFactory) {
            return new options.webpackDevServerFactory(config, webpack);
        }
        return new webpack_dev_server_1.default(config, webpack);
    };
    const log = options.logging || ((stats, config) => context.logger.info(stats.toString(config.stats)));
    return createWebpack({ ...config, watch: false }).pipe((0, operators_1.switchMap)((webpackCompiler) => new rxjs_1.Observable((obs) => {
        var _a;
        const devServerConfig = options.devServerConfig || config.devServer || {};
        (_a = devServerConfig.host) !== null && _a !== void 0 ? _a : (devServerConfig.host = 'localhost');
        let result;
        webpackCompiler.hooks.done.tap('build-webpack', (stats) => {
            // Log stats.
            log(stats, config);
            obs.next({
                ...result,
                emittedFiles: (0, utils_1.getEmittedFiles)(stats.compilation),
                success: !stats.hasErrors(),
                outputPath: stats.compilation.outputOptions.path,
            });
        });
        const devServer = createWebpackDevServer(webpackCompiler, devServerConfig);
        devServer.startCallback((err) => {
            var _a;
            if (err) {
                obs.error(err);
                return;
            }
            const address = (_a = devServer.server) === null || _a === void 0 ? void 0 : _a.address();
            if (!address) {
                obs.error(new Error(`Dev-server address info is not defined.`));
                return;
            }
            result = {
                success: true,
                port: typeof address === 'string' ? 0 : address.port,
                family: typeof address === 'string' ? '' : address.family,
                address: typeof address === 'string' ? address : address.address,
            };
        });
        // Teardown logic. Close the server when unsubscribed from.
        return () => {
            devServer.stopCallback(() => { });
            webpackCompiler.close(() => { });
        };
    })));
}
exports.runWebpackDevServer = runWebpackDevServer;
exports.default = (0, architect_1.createBuilder)((options, context) => {
    const configPath = (0, path_1.resolve)(context.workspaceRoot, options.webpackConfig);
    return (0, rxjs_1.from)((0, utils_1.getWebpackConfig)(configPath)).pipe((0, operators_1.switchMap)((config) => runWebpackDevServer(config, context)));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9hbmd1bGFyX2RldmtpdC9idWlsZF93ZWJwYWNrL3NyYy93ZWJwYWNrLWRldi1zZXJ2ZXIvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7R0FNRzs7Ozs7O0FBRUgseURBQTBFO0FBQzFFLCtCQUE4QztBQUM5QywrQkFBMEQ7QUFDMUQsOENBQTJDO0FBQzNDLHNEQUE4QjtBQUM5Qiw0RUFBa0Q7QUFDbEQsb0NBQTZEO0FBWTdELFNBQWdCLG1CQUFtQixDQUNqQyxNQUE2QixFQUM3QixPQUF1QixFQUN2QixVQUtJLEVBQUU7SUFFTixNQUFNLGFBQWEsR0FBRyxDQUFDLENBQXdCLEVBQUUsRUFBRTtRQUNqRCxJQUFJLE9BQU8sQ0FBQyxjQUFjLEVBQUU7WUFDMUIsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6QyxJQUFJLElBQUEsbUJBQVksRUFBQyxNQUFNLENBQUMsRUFBRTtnQkFDeEIsT0FBTyxNQUFNLENBQUM7YUFDZjtpQkFBTTtnQkFDTCxPQUFPLElBQUEsU0FBRSxFQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ25CO1NBQ0Y7YUFBTTtZQUNMLE9BQU8sSUFBQSxTQUFFLEVBQUMsSUFBQSxpQkFBTyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDdkI7SUFDSCxDQUFDLENBQUM7SUFFRixNQUFNLHNCQUFzQixHQUFHLENBQzdCLE9BQWlELEVBQ2pELE1BQXNDLEVBQ3RDLEVBQUU7UUFDRixJQUFJLE9BQU8sQ0FBQyx1QkFBdUIsRUFBRTtZQUNuQyxPQUFPLElBQUksT0FBTyxDQUFDLHVCQUF1QixDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztTQUM3RDtRQUVELE9BQU8sSUFBSSw0QkFBZ0IsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7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bkIsTUFBTSxVQUFVLEdBQUcsSUFBQSxjQUFXLEVBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7SUFFN0UsT0FBTyxJQUFBLFdBQUksRUFBQyxJQUFBLHdCQUFnQixFQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUM1QyxJQUFBLHFCQUFTLEVBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUM1RCxDQUFDO0FBQ0osQ0FBQyxDQUNGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHsgQnVpbGRlckNvbnRleHQsIGNyZWF0ZUJ1aWxkZXIgfSBmcm9tICdAYW5ndWxhci1kZXZraXQvYXJjaGl0ZWN0JztcbmltcG9ydCB7IHJlc29sdmUgYXMgcGF0aFJlc29sdmUgfSBmcm9tICdwYXRoJztcbmltcG9ydCB7IE9ic2VydmFibGUsIGZyb20sIGlzT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB3ZWJwYWNrIGZyb20gJ3dlYnBhY2snO1xuaW1wb3J0IFdlYnBhY2tEZXZTZXJ2ZXIgZnJvbSAnd2VicGFjay1kZXYtc2VydmVyJztcbmltcG9ydCB7IGdldEVtaXR0ZWRGaWxlcywgZ2V0V2VicGFja0NvbmZpZyB9IGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCB7IEJ1aWxkUmVzdWx0LCBXZWJwYWNrRmFjdG9yeSwgV2VicGFja0xvZ2dpbmdDYWxsYmFjayB9IGZyb20gJy4uL3dlYnBhY2snO1xuaW1wb3J0IHsgU2NoZW1hIGFzIFdlYnBhY2tEZXZTZXJ2ZXJCdWlsZGVyU2NoZW1hIH0gZnJvbSAnLi9zY2hlbWEnO1xuXG5leHBvcnQgdHlwZSBXZWJwYWNrRGV2U2VydmVyRmFjdG9yeSA9IHR5cGVvZiBXZWJwYWNrRGV2U2VydmVyO1xuXG5leHBvcnQgdHlwZSBEZXZTZXJ2ZXJCdWlsZE91dHB1dCA9IEJ1aWxkUmVzdWx0ICYge1xuICBwb3J0OiBudW1iZXI7XG4gIGZhbWlseTogc3RyaW5nO1xuICBhZGRyZXNzOiBzdHJpbmc7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gcnVuV2VicGFja0RldlNlcnZlcihcbiAgY29uZmlnOiB3ZWJwYWNrLkNvbmZpZ3VyYXRpb24sXG4gIGNvbnRleHQ6IEJ1aWxkZXJDb250ZXh0LFxuICBvcHRpb25zOiB7XG4gICAgZGV2U2VydmVyQ29uZmlnPzogV2VicGFja0RldlNlcnZlci5Db25maWd1cmF0aW9uO1xuICAgIGxvZ2dpbmc/OiBXZWJwYWNrTG9nZ2luZ0NhbGxiYWNrO1xuICAgIHdlYnBhY2tGYWN0b3J5PzogV2VicGFja0ZhY3Rvcnk7XG4gICAgd2VicGFja0RldlNlcnZlckZhY3Rvcnk/OiBXZWJwYWNrRGV2U2VydmVyRmFjdG9yeTtcbiAgfSA9IHt9LFxuKTogT2JzZXJ2YWJsZTxEZXZTZXJ2ZXJCdWlsZE91dHB1dD4ge1xuICBjb25zdCBjcmVhdGVXZWJwYWNrID0gKGM6IHdlYnBhY2suQ29uZmlndXJhdGlvbikgPT4ge1xuICAgIGlmIChvcHRpb25zLndlYnBhY2tGYWN0b3J5KSB7XG4gICAgICBjb25zdCByZXN1bHQgPSBvcHRpb25zLndlYnBhY2tGYWN0b3J5KGMpO1xuICAgICAgaWYgKGlzT2JzZXJ2YWJsZShyZXN1bHQpKSB7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gb2YocmVzdWx0KTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG9mKHdlYnBhY2soYykpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBjcmVhdGVXZWJwYWNrRGV2U2VydmVyID0gKFxuICAgIHdlYnBhY2s6IHdlYnBhY2suQ29tcGlsZXIgfCB3ZWJwYWNrLk11bHRpQ29tcGlsZXIsXG4gICAgY29uZmlnOiBXZWJwYWNrRGV2U2VydmVyLkNvbmZpZ3VyYXRpb24sXG4gICkgPT4ge1xuICAgIGlmIChvcHRpb25zLndlYnBhY2tEZXZTZXJ2ZXJGYWN0b3J5KSB7XG4gICAgICByZXR1cm4gbmV3IG9wdGlvbnMud2VicGFja0RldlNlcnZlckZhY3RvcnkoY29uZmlnLCB3ZWJwYWNrKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFdlYnBhY2tEZXZTZXJ2ZXIoY29uZmlnLCB3ZWJwYWNrKTtcbiAgfTtcblxuICBjb25zdCBsb2c6IFdlYnBhY2tMb2dnaW5nQ2FsbGJhY2sgPVxuICAgIG9wdGlvbnMubG9nZ2luZyB8fCAoKHN0YXRzLCBjb25maWcpID0+IGNvbnRleHQubG9nZ2VyLmluZm8oc3RhdHMudG9TdHJpbmcoY29uZmlnLnN0YXRzKSkpO1xuXG4gIHJldHVybiBjcmVhdGVXZWJwYWNrKHsgLi4uY29uZmlnLCB3YXRjaDogZmFsc2UgfSkucGlwZShcbiAgICBzd2l0Y2hNYXAoXG4gICAgICAod2VicGFja0NvbXBpbGVyKSA9PlxuICAgICAgICBuZXcgT2JzZXJ2YWJsZTxEZXZTZXJ2ZXJCdWlsZE91dHB1dD4oKG9icykgPT4ge1xuICAgICAgICAgIGNvbnN0IGRldlNlcnZlckNvbmZpZyA9IG9wdGlvbnMuZGV2U2VydmVyQ29uZmlnIHx8IGNvbmZpZy5kZXZTZXJ2ZXIgfHwge307XG4gICAgICAgICAgZGV2U2VydmVyQ29uZmlnLmhvc3QgPz89ICdsb2NhbGhvc3QnO1xuXG4gICAgICAgICAgbGV0IHJlc3VsdDogUGFydGlhbDxEZXZTZXJ2ZXJCdWlsZE91dHB1dD47XG5cbiAgICAgICAgICB3ZWJwYWNrQ29tcGlsZXIuaG9va3MuZG9uZS50YXAoJ2J1aWxkLXdlYnBhY2snLCAoc3RhdHMpID0+IHtcbiAgICAgICAgICAgIC8vIExvZyBzdGF0cy5cbiAgICAgICAgICAgIGxvZyhzdGF0cywgY29uZmlnKTtcbiAgICAgICAgICAgIG9icy5uZXh0KHtcbiAgICAgICAgICAgICAgLi4ucmVzdWx0LFxuICAgICAgICAgICAgICBlbWl0dGVkRmlsZXM6IGdldEVtaXR0ZWRGaWxlcyhzdGF0cy5jb21waWxhdGlvbiksXG4gICAgICAgICAgICAgIHN1Y2Nlc3M6ICFzdGF0cy5oYXNFcnJvcnMoKSxcbiAgICAgICAgICAgICAgb3V0cHV0UGF0aDogc3RhdHMuY29tcGlsYXRpb24ub3V0cHV0T3B0aW9ucy5wYXRoLFxuICAgICAgICAgICAgfSBhcyB1bmtub3duIGFzIERldlNlcnZlckJ1aWxkT3V0cHV0KTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGNvbnN0IGRldlNlcnZlciA9IGNyZWF0ZVdlYnBhY2tEZXZTZXJ2ZXIod2VicGFja0NvbXBpbGVyLCBkZXZTZXJ2ZXJDb25maWcpO1xuICAgICAgICAgIGRldlNlcnZlci5zdGFydENhbGxiYWNrKChlcnIpID0+IHtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgb2JzLmVycm9yKGVycik7XG5cbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBhZGRyZXNzID0gZGV2U2VydmVyLnNlcnZlcj8uYWRkcmVzcygpO1xuICAgICAgICAgICAgaWYgKCFhZGRyZXNzKSB7XG4gICAgICAgICAgICAgIG9icy5lcnJvcihuZXcgRXJyb3IoYERldi1zZXJ2ZXIgYWRkcmVzcyBpbmZvIGlzIG5vdCBkZWZpbmVkLmApKTtcblxuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlc3VsdCA9IHtcbiAgICAgICAgICAgICAgc3VjY2VzczogdHJ1ZSxcbiAgICAgICAgICAgICAgcG9ydDogdHlwZW9mIGFkZHJlc3MgPT09ICdzdHJpbmcnID8gMCA6IGFkZHJlc3MucG9ydCxcbiAgICAgICAgICAgICAgZmFtaWx5OiB0eXBlb2YgYWRkcmVzcyA9PT0gJ3N0cmluZycgPyAnJyA6IGFkZHJlc3MuZmFtaWx5LFxuICAgICAgICAgICAgICBhZGRyZXNzOiB0eXBlb2YgYWRkcmVzcyA9PT0gJ3N0cmluZycgPyBhZGRyZXNzIDogYWRkcmVzcy5hZGRyZXNzLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIC8vIFRlYXJkb3duIGxvZ2ljLiBDbG9zZSB0aGUgc2VydmVyIHdoZW4gdW5zdWJzY3JpYmVkIGZyb20uXG4gICAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgIGRldlNlcnZlci5zdG9wQ2FsbGJhY2soKCkgPT4ge30pO1xuICAgICAgICAgICAgd2VicGFja0NvbXBpbGVyLmNsb3NlKCgpID0+IHt9KTtcbiAgICAgICAgICB9O1xuICAgICAgICB9KSxcbiAgICApLFxuICApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVCdWlsZGVyPFdlYnBhY2tEZXZTZXJ2ZXJCdWlsZGVyU2NoZW1hLCBEZXZTZXJ2ZXJCdWlsZE91dHB1dD4oXG4gIChvcHRpb25zLCBjb250ZXh0KSA9PiB7XG4gICAgY29uc3QgY29uZmlnUGF0aCA9IHBhdGhSZXNvbHZlKGNvbnRleHQud29ya3NwYWNlUm9vdCwgb3B0aW9ucy53ZWJwYWNrQ29uZmlnKTtcblxuICAgIHJldHVybiBmcm9tKGdldFdlYnBhY2tDb25maWcoY29uZmlnUGF0aCkpLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAoKGNvbmZpZykgPT4gcnVuV2VicGFja0RldlNlcnZlcihjb25maWcsIGNvbnRleHQpKSxcbiAgICApO1xuICB9LFxuKTtcbiJdfQ==